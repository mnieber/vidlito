import { ClipT } from 'src/api/types/ClipT';
import { UserProfileT } from 'src/api/types/UserProfileT';

export type PlaylistT = {
  clipSet: ClipT[];
  description?: string;
  id: string;
  name: string;
  owner: UserProfileT;
  slug: string;
};

export type PlaylistByIdT = { [id: string]: PlaylistT };

export type PlaylistFormT = {
  description?: string;
  id: string;
  name: string;
  slug: string;
};
