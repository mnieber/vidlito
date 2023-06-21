import { useRouteMatch } from 'react-router-dom';
import { navGoToActions } from '/src/actions/ActionsNavEvents';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  ActionsNavEvents,
  ClipsNavEvents,
  PlaylistsNavEvents,
} from '/src/frames/pages';
import { useInstallNavLayer } from '/src/navHandler';
import { navHandler } from '/src/navHandler/NavHandler';

export type MainNavEventLayerT = typeof ActionsNavEvents &
  typeof ClipsNavEvents &
  typeof PlaylistsNavEvents & {};

export const createMainNavEventLayer = () => {
  return {
    goToActions: (() => {
      navHandler.updateHiddenParams();
      const ufn = navHandler.routeUfns.actions(navHandler.history.push);
      ufn({
        ...navHandler.getParams(true),
        ownerUsername: navHandler.hiddenParams.username,
      });
    }) as typeof navGoToActions,
    correctClipSlugUrlParam: (clipSlug: string) => {
      navHandler.hiddenParams.clipSlug = clipSlug;
      const ufn = navHandler.routeUfns.clip(navHandler.history.push);
      ufn({ ...navHandler.getParams(), clipSlug });
    },
    userHighlightsClip: (clipSlug: string) => {
      navHandler.hiddenParams.clipSlug = clipSlug;
      const ufn = navHandler.routeUfns.clip(navHandler.history.push);
      ufn({ ...navHandler.getParams(), clipSlug });
    },
    userCancelledClipForm: () => {},
    userSubmittedClipForm: (clipSlug: string) => {},
    correctPlaylistSlugUrlParam: (playlistSlug: string) => {
      navHandler.hiddenParams.playlistSlug = playlistSlug;
      const ufn = navHandler.routeUfns.playlist(navHandler.history.push);
      ufn({ ...navHandler.getParams(), playlistSlug });
    },
    userCancelledPlaylistForm: () => {},
    userHighlightsPlaylist: (playlistSlug: string) => {
      navHandler.hiddenParams.playlistSlug = playlistSlug;
      const ufn = navHandler.routeUfns.playlist(navHandler.history.push);
      ufn({ ...navHandler.getParams(true), playlistSlug });
    },
    userSubmittedPlaylistForm: (playlistSlug: string) => {},
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
