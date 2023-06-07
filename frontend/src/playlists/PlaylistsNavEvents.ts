import { NavHandler } from '/src/navHandler';

export const PlaylistsNavEvents = {
  playlistHighlightIsCorrectedTo(this: NavHandler, playlistSlug: string) {},
  userCancelledPlaylistForm(this: NavHandler) {},
  userHighlightsPlaylist(this: NavHandler, playlistSlug: string) {},
  userSubmittedPlaylistForm(this: NavHandler, playlistSlug: string) {},
};
