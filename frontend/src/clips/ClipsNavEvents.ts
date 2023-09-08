import { navHandler } from 'react-nav-handler';

export const navToClip = (
  ownerUsername: string,
  playlistSlug: string,
  clipSlug: string
): void =>
  navHandler.getNavFn('navToClip', navToClip)(
    ownerUsername,
    playlistSlug,
    clipSlug
  );
