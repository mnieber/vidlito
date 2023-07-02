import { PlaylistT } from '/src/api/types/PlaylistT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { getNavFn } from '/src/navHandler/NavHandler';

export const navToClip = (
  playlist: PlaylistT,
  clipSlug: string,
  userProfile: UserProfileT | null
): void => getNavFn('navToClip', navToClip)(playlist, clipSlug, userProfile);
