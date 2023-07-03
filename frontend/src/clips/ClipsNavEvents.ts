import { getNavFn } from '/src/navHandler/NavHandler';

export const navToClip = (
  ownerUsername: string,
  playlistSlug: string,
  clipSlug: string
): void =>
  getNavFn('navToClip', navToClip)(ownerUsername, playlistSlug, clipSlug);
