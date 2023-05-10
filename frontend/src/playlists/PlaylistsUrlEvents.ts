import { UrlEventHandler } from '/src/urlEvents';

export const PlaylistsUrlEvents = {
  playlistHighlightIsCorrectedTo(
    this: UrlEventHandler,
    playlistSlug: string
  ) {},
  userCancelledPlaylistForm(this: UrlEventHandler) {},
  userHighlightsPlaylist(this: UrlEventHandler, playlistSlug: string) {},
  userSubmittedPlaylistForm(this: UrlEventHandler, playlistSlug: string) {},
};
