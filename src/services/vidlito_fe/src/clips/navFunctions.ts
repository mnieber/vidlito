import { createNavFunction, stubNavTarget } from 'react-nav-handler';

export const toClip = createNavFunction(
  'toClip',
  (ownerUsername: string, playlistSlug: string, clipSlug: string) =>
    stubNavTarget
);
