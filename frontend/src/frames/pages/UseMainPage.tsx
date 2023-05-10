import { useRouteMatch } from 'react-router-dom';
import {
  ActionsUrlEvents,
  ClipsUrlEvents,
  PlaylistsUrlEvents,
} from '/src/frames/pages';
import { UrlEventHandler, useInstallEventLayer } from '/src/urlEvents';
import { UrlEventLayer } from '/src/urlEvents/UrlEventHandler';

export type MainUrlEventLayerT = typeof ActionsUrlEvents &
  typeof ClipsUrlEvents &
  typeof PlaylistsUrlEvents & {};

export class MainUrlEventLayer
  extends UrlEventLayer
  implements MainUrlEventLayerT
{
  goToActions(this: UrlEventHandler) {
    this.updateHiddenParams();
    const ufn = this.routeUfns.actions(this.history.push);
    ufn({
      ...this.getParams(true),
      ownerUsername: this.hiddenParams.username,
    });
  }

  clipHighlightIsCorrectedTo(this: UrlEventHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  }

  userHighlightsClip(this: UrlEventHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  }

  userCancelledClipForm(this: UrlEventHandler) {}

  userSubmittedClipForm(this: UrlEventHandler, clipSlug: string) {}

  playlistHighlightIsCorrectedTo(this: UrlEventHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(), playlistSlug });
  }

  userCancelledPlaylistForm(this: UrlEventHandler) {}

  userHighlightsPlaylist(this: UrlEventHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(true), playlistSlug });
  }

  userSubmittedPlaylistForm(this: UrlEventHandler, playlistSlug: string) {}
}

export type PropsT = React.PropsWithChildren<{}>;

export const UseMainPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallEventLayer(
    'MainUrlEventLayer',
    routeMatch.path,
    (name: string, route: string) => new MainUrlEventLayer(name, route)
  );
  return <>{props.children}</>;
};
