import { navHandler } from '/src/navHandler/NavHandler';

export const navToPlaylist = (
  ownerUsername: string,
  playlistSlug: string
): void =>
  navHandler.getNavFn('navToPlaylist', navToPlaylist)(
    ownerUsername,
    playlistSlug
  );
