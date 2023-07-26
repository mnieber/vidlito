import { useRouteMatch } from 'react-router-dom';
import { navToActions } from '/src/actions/ActionsNavEvents';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { cookiesState } from '/src/dashboard/DashboardState/CookiesState';
import { useInstallNavLayer } from '/src/navHandler';
import { navHandler } from '/src/navHandler/NavHandler';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { navToSearch } from '/src/search/SearchNavEvents';

export type EventLayerPropsT = {
  getUserProfile: () => UserProfileT | null;
};

export const createMainNavEventLayer = (props: EventLayerPropsT) => {
  return {
    navToActions: ((username: string) => {
      const ufn = navHandler.routeUfns.actions(navHandler.history.push);
      ufn({
        ...navHandler.getParams(),
        ownerUsername: username,
      });
    }) as typeof navToActions,
    navToSearch: (() => {
      const ufn = navHandler.routeUfns.search(navHandler.history.push);
      ufn({
        ...navHandler.getParams(),
      });
    }) as typeof navToSearch,
    navToClip: ((
      ownerUsername: string,
      playlistSlug: string,
      clipSlug: string
    ) => {
      const ufn = navHandler.routeUfns.clip(navHandler.history.push);
      const { route, changed } = ufn({
        ...navHandler.getParams(),
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
      const ufn = navHandler.routeUfns.playlist(navHandler.history.push);
      ufn({
        ...navHandler.getParams(),
        ownerUsername: ownerUsername,
        playlistSlug: playlistSlug,
      });
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

export const UseMainPage = withDefaultProps(
  (props: PropsT & typeof DefaultProps) => {
    const routeMatch = useRouteMatch();
    const getUserProfile = () => props.userProfile;

    useInstallNavLayer(
      'MainNavEventLayer',
      routeMatch.path,
      createMainNavEventLayer({ getUserProfile })
    );
    return <>{props.children}</>;
  },
  DefaultProps
);
