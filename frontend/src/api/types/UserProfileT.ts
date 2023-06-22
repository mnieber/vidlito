import { PlaylistT } from '/src/api/types/PlaylistT';

export type UserProfileT = {
  username: string;
  followSet: PlaylistT[];
};
