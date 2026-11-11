import { NavHandlersProvider, type NavContext } from 'react-nav-handler';
import { withContextProps } from 'react-props-from-context';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { toClip } from '/src/clips/navFunctions';
import { cookiesState } from '/src/dashboard/DashboardState/CookiesState';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { toPlaylist } from '/src/playlists/navFunctions';
import { history } from '/src/routes/history';
import { getRouteFns } from '/src/routes/routeTable';
import { getRouteParams } from '/src/routes/utils/getRouteParams';
import { useBuilder } from '/src/utils/hooks';
import { pathname } from '/src/utils/urls';

export type NavContextPropsT = {
  getUserProfile: () => UserProfileT | null;
};

export const createNavFunctionTable = (props: NavContextPropsT) => {
  return {
    toClip: ((navContext: NavContext) =>
      (ownerUsername: string, playlistSlug: string, clipSlug: string) => {
        // We prefer not to have urls in the history with a dash as clipSlug
        const url = getRouteFns<DashboardRoutesT>().clip({
          ownerUsername: ownerUsername,
          playlistSlug: playlistSlug,
          clipSlug,
        });

        const userProfile = props.getUserProfile();
        const useReplace = getRouteParams().clipSlug === '-';
        const nav = () => {
          if (url !== pathname()) {
            const ufn = useReplace ? history.replace : history.push;
            ufn(url);
            if (userProfile && clipSlug !== 'new-clip') {
              cookiesState.setLastUrl(url);
            }
          }
        };

        return { url, nav };
      }) as typeof toClip,
    toPlaylist: ((navContext: NavContext) =>
      (ownerUsername: string, playlistSlug: string) => {
        return toClip(navContext)(ownerUsername, playlistSlug, '-');
      }) as typeof toPlaylist,
  };
};

export type PropsT = React.PropsWithChildren<{}>;

export const ContextProps = {
  userProfile: dashboardCtx.userProfile,
};

export const DashboardNavHandler = withContextProps(
  (props: PropsT & typeof ContextProps) => {
    const getUserProfile = () => props.userProfile;
    const handler = useBuilder(() => {
      return {
        id: 'DashboardNavHandler',
        navFunctionTable: createNavFunctionTable({ getUserProfile }),
      };
    });
    return (
      <NavHandlersProvider extend value={[handler]}>
        {props.children}
      </NavHandlersProvider>
    );
  },
  ContextProps
);
