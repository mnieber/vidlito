import { createNavFunction, stub } from 'react-nav-handler';

export const navToPlaylist = createNavFunction(
  'navToPlaylist',
  (ownerUsername: string, playlistSlug: string) => stub
);
