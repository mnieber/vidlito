import { ClipT } from 'src/api/types/ClipT';

export type PlaylistT = {
  clipSet: ClipT[];
  description?: string;
  id: string;
  name: string;
  slug: string;
};

export type PlaylistByIdT = { [id: string]: PlaylistT };

export type PlaylistFormT = {
  description?: string;
  name: string;
  slug: string;
  id: string;
};
