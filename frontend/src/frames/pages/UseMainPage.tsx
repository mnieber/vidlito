import { useRouteMatch } from 'react-router-dom';
import { navToActions } from '/src/actions/ActionsNavEvents';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { useInstallNavLayer } from '/src/navHandler';
import { navHandler } from '/src/navHandler/NavHandler';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';

export const createMainNavEventLayer = () => {
  return {
    navToActions: (() => {
      const ufn = navHandler.routeUfns.actions(navHandler.history.push);
      ufn({
        ...navHandler.getParams(true),
        ownerUsername: navHandler.hiddenParams.username,
      });
    }) as typeof navToActions,
    navToClip: ((clipSlug: string) => {
      navHandler.hiddenParams.clipSlug = clipSlug;
      const ufn = navHandler.routeUfns.clip(navHandler.history.push);
      ufn({ ...navHandler.getParams(), clipSlug });
    }) as typeof navToClip,
    navToPlaylist: ((playlistSlug: string) => {
      navHandler.hiddenParams.playlistSlug = playlistSlug;
      const ufn = navHandler.routeUfns.playlist(navHandler.history.push);
      ufn({ ...navHandler.getParams(true), playlistSlug });
    }) as typeof navToPlaylist,
  };
};

export type PropsT = React.PropsWithChildren<{}>;

export const DefaultProps = {
  ...dps.videoController,
  ...dps.clips,
  ...dps.clipsHighlight,
};

export const UseMainPage = withDefaultProps(
  (props: PropsT & typeof DefaultProps) => {
    const routeMatch = useRouteMatch();
    useInstallNavLayer(
      'MainNavEventLayer',
      routeMatch.path,
      createMainNavEventLayer()
    );
    return <>{props.children}</>;
  },
  DefaultProps
);
