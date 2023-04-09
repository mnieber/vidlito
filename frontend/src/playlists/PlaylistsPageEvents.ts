import { PageEventHandler } from 'src/pageEvents';

export const PlaylistsPageEvents = {
  playlistHighlightIsCorrectedTo(
    this: PageEventHandler,
    playlistSlug: string
  ) {},
  userCancelledPlaylistForm(this: PageEventHandler) {},
  userCreatesNewPlaylist(this: PageEventHandler) {},
  userHighlightsPlaylist(this: PageEventHandler, playlistSlug: string) {},
  userSubmittedPlaylistForm(this: PageEventHandler, playlistSlug: string) {},
};

export type PlaylistsPageEventsT = typeof PlaylistsPageEvents;
