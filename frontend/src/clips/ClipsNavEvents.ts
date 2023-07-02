import { PlaylistT } from '/src/api/types/PlaylistT';
import { getNavFn } from '/src/navHandler/NavHandler';

export const navToClip = (playlist: PlaylistT, clipSlug: string): void =>
  getNavFn('navToClip', navToClip)(playlist, clipSlug);
