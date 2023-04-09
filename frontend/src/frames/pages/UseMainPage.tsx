import { ActionsPageEventsT } from 'src/actions/ActionsPageEvents';
import { ClipsPageEventsT } from 'src/frames/pages';
import { PageEventHandler, withPageEventHandlers } from 'src/pageEvents';
import { PlaylistsPageEventsT } from 'src/playlists/PlaylistsPageEvents';

export type MainPageEventHandlerT = ActionsPageEventsT &
  ClipsPageEventsT &
  PlaylistsPageEventsT & {};

export const MainPageEventHandler: MainPageEventHandlerT = {
  clipHighlightIsCorrectedTo(this: PageEventHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  },
  closeActions(this: PageEventHandler) {
    const ufn = this.routeUfns.clip(this.history.push);
    ufn(this.getParams(true));
  },
  goToActions(this: PageEventHandler) {
    this.updateHiddenParams();
    const ufn = this.routeUfns.actions(this.history.push);
    ufn({
      ...this.getParams(true),
      ownerUsername: this.hiddenParams.username,
    });
  },
  playlistHighlightIsCorrectedTo(this: PageEventHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(), playlistSlug });
  },
  userCancelledClipForm(this: PageEventHandler) {},
  userCancelledPlaylistForm(this: PageEventHandler) {},
  userCreatesNewPlaylist(this: PageEventHandler) {},
  userHighlightsClip(this: PageEventHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  },
  userHighlightsPlaylist(this: PageEventHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(true), playlistSlug });
  },
  userSubmittedClipForm(this: PageEventHandler, clipSlug: string) {},
  userSubmittedPlaylistForm(this: PageEventHandler, playlistSlug: string) {},
};

export const UseMainPage = withPageEventHandlers({
  layerName: 'MainPageEventHandler',
  eventHandlers: MainPageEventHandler,
});
