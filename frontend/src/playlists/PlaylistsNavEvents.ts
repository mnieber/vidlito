import { getNavFn } from '/src/navHandler/NavHandler';

export const navCorrectPlaylistSlugUrlParam = (playlistSlug: string): void =>
  getNavFn(
    'correctPlaylistSlugUrlParam',
    navCorrectPlaylistSlugUrlParam
  )(playlistSlug);

export const navUserCancelledPlaylistForm = (): void =>
  getNavFn('userCancelledPlaylistForm', navUserCancelledPlaylistForm)();

export const navUserHighlightsPlaylist = (playlistSlug: string): void =>
  getNavFn('userHighlightsPlaylist', navUserHighlightsPlaylist)(playlistSlug);

export const navUserSubmittedPlaylistForm = (playlistSlug: string): void =>
  getNavFn(
    'userSubmittedPlaylistForm',
    navUserSubmittedPlaylistForm
  )(playlistSlug);
