import { useRouteMatch } from 'react-router-dom';
import {
  ActionsPageEventsT,
  ClipsPageEventsT,
  PlaylistsPageEventsT,
} from 'src/frames/pages';
import { PageEventHandler, useInstallEventHandlers } from 'src/pageEvents';
import { PageEventLayer } from 'src/pageEvents/PageEventHandler';

export type MainPageEventHandlerT = ActionsPageEventsT &
  ClipsPageEventsT &
  PlaylistsPageEventsT & {};

export class MainPageEventHandler
  extends PageEventLayer
  implements MainPageEventHandlerT
{
  closeActions(this: PageEventHandler) {
    const ufn = this.routeUfns.clip(this.history.push);
    ufn(this.getParams(true));
  }

  goToActions(this: PageEventHandler) {
    this.updateHiddenParams();
    const ufn = this.routeUfns.actions(this.history.push);
    ufn({
      ...this.getParams(true),
      ownerUsername: this.hiddenParams.username,
    });
  }

  clipHighlightIsCorrectedTo(this: PageEventHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  }

  userHighlightsClip(this: PageEventHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  }

  userCancelledClipForm(this: PageEventHandler) {}

  userSubmittedClipForm(this: PageEventHandler, clipSlug: string) {}

  playlistHighlightIsCorrectedTo(this: PageEventHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(), playlistSlug });
  }

  userCancelledPlaylistForm(this: PageEventHandler) {}

  userCreatesNewPlaylist(this: PageEventHandler) {}

  userHighlightsPlaylist(this: PageEventHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(true), playlistSlug });
  }

  userSubmittedPlaylistForm(this: PageEventHandler, playlistSlug: string) {}
}

export type PropsT = React.PropsWithChildren<{}>;

export const UseMainPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallEventHandlers(
    'MainPageEventHandler',
    routeMatch.path,
    MainPageEventHandler
  );
  return <>{props.children}</>;
};
