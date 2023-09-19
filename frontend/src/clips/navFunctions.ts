import { createNavFunction, stub } from 'react-nav-handler';

export const navToClip = createNavFunction(
  'navToClip',
  (ownerUsername: string, playlistSlug: string, clipSlug: string) => stub
);
