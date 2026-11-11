import { createNavFunction, stubNavTarget } from 'react-nav-handler';

export const toPlaylist = createNavFunction(
  'toPlaylist',
  (ownerUsername: string, playlistSlug: string) => stubNavTarget
);
