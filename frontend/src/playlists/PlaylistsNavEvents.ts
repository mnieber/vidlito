import { getNavFn } from '/src/navHandler/NavHandler';

export const navToPlaylist = (
  ownerUsername: string,
  playlistSlug: string
): void =>
  getNavFn('navToPlaylist', navToPlaylist)(ownerUsername, playlistSlug);
