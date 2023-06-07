import { useRouteMatch } from 'react-router-dom';
import {
  ActionsNavEvents,
  ClipsNavEvents,
  PlaylistsNavEvents,
} from '/src/frames/pages';
import { NavHandler, useInstallNavLayer } from '/src/navHandler';
import { NavLayer } from '/src/navHandler/NavHandler';

export type MainNavEventLayerT = typeof ActionsNavEvents &
  typeof ClipsNavEvents &
  typeof PlaylistsNavEvents & {};

export class MainNavEventLayer extends NavLayer implements MainNavEventLayerT {
  goToActions(this: NavHandler) {
    this.updateHiddenParams();
    const ufn = this.routeUfns.actions(this.history.push);
    ufn({
      ...this.getParams(true),
      ownerUsername: this.hiddenParams.username,
    });
  }

  clipHighlightIsCorrectedTo(this: NavHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  }

  userHighlightsClip(this: NavHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  }

  userCancelledClipForm(this: NavHandler) {}

  userSubmittedClipForm(this: NavHandler, clipSlug: string) {}

  playlistHighlightIsCorrectedTo(this: NavHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(), playlistSlug });
  }

  userCancelledPlaylistForm(this: NavHandler) {}

  userHighlightsPlaylist(this: NavHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(true), playlistSlug });
  }

  userSubmittedPlaylistForm(this: NavHandler, playlistSlug: string) {}
}

export type PropsT = React.PropsWithChildren<{}>;

export const UseMainPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallNavLayer(
    'MainNavEventLayer',
    routeMatch.path,
    (name: string, route: string) => new MainNavEventLayer(name, route)
  );
  return <>{props.children}</>;
};
