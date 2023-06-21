import { getNavFn } from '/src/navHandler/NavHandler';

export const navToClip = (clipSlug: string): void =>
  getNavFn('navToClip', navToClip)(clipSlug);
