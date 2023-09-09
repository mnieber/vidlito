import { useInstallNavPage } from 'react-nav-handler';
import { navToActions } from '/src/actions/ActionsNavEvents';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { cookiesState } from '/src/dashboard/DashboardState/CookiesState';
import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { history } from '/src/routes/history';
import { getRouteUfns } from '/src/routes/routeTable';
import { getRouteParams } from '/src/routes/utils/getRouteParams';
import { navToSearch } from '/src/search/SearchNavEvents';

export type CreateDashboardNavPagePropsT = {
  getUserProfile: () => UserProfileT | null;
};

export const createDashboardNavPage = (props: CreateDashboardNavPagePropsT) => {
  return {
    navToActions: ((username: string) => {
      const ufn = getRouteUfns<DashboardRoutesT>().actions(history.push);
      ufn();
    }) as typeof navToActions,
    navToSearch: (() => {
      const ufn = getRouteUfns<DashboardRoutesT>().search(history.push);
      ufn();
    }) as typeof navToSearch,
    navToClip: ((
      ownerUsername: string,
      playlistSlug: string,
      clipSlug: string
    ) => {
      // We prefer not to have urls in the history with a dash as clipSlug
      const useReplace = getRouteParams().clipSlug === '-';
      const ufn = getRouteUfns<DashboardRoutesT>().clip(
        useReplace ? history.replace : history.push
      );
      const { route, changed } = ufn({
        ownerUsername: ownerUsername,
        playlistSlug: playlistSlug,
        clipSlug,
      });
      const userProfile = props.getUserProfile();
      if (changed && userProfile && clipSlug !== 'new-clip') {
        cookiesState.setLastUrl(route);
      }
    }) as typeof navToClip,
    navToPlaylist: ((ownerUsername: string, playlistSlug: string) => {
      navToClip(ownerUsername, playlistSlug, '-');
    }) as typeof navToPlaylist,
  };
};

export type PropsT = React.PropsWithChildren<{}>;

export const DefaultProps = {
  ...dps.videoController,
  ...dps.clips,
  ...dps.clipsHighlight,
  ...dps.userProfile,
};

export const DashboardNavPage = withDefaultProps(
  (props: PropsT & typeof DefaultProps) => {
    const getUserProfile = () => props.userProfile;
    useInstallNavPage(
      'DashboardNavPage',
      createDashboardNavPage({ getUserProfile })
    );
    return <>{props.children}</>;
  },
  DefaultProps
);
