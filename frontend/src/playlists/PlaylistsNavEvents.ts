import { getNavFn } from '/src/navHandler/NavHandler';

export const navToPlaylist = (playlistSlug: string): void =>
  getNavFn('navToPlaylist', navToPlaylist)(playlistSlug);
