import { navHandler } from 'react-nav-handler';

export const navToPlaylist = (
  ownerUsername: string,
  playlistSlug: string
): void =>
  navHandler.getNavFn('navToPlaylist', navToPlaylist)(
    ownerUsername,
    playlistSlug
  );
