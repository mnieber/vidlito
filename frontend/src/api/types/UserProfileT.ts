import { PlaylistT } from 'src/api/types/PlaylistT';

export type UserProfileT = {
  displayName: string;
  playlistSet: PlaylistT[];
  userId: string;
};
