import { NavHandler } from '/src/navHandler';

export const PlaylistsNavEvents = {
  correctPlaylistSlugUrlParam(this: NavHandler, playlistSlug: string) {},
  userCancelledPlaylistForm(this: NavHandler) {},
  userHighlightsPlaylist(this: NavHandler, playlistSlug: string) {},
  userSubmittedPlaylistForm(this: NavHandler, playlistSlug: string) {},
};
