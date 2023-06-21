import { getNavFn } from '/src/navHandler/NavHandler';

export const navUserHighlightsPlaylist = (playlistSlug: string): void =>
  getNavFn('userHighlightsPlaylist', navUserHighlightsPlaylist)(playlistSlug);
