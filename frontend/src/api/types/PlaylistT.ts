import { initRS } from 'src/api/ResourceState';
import { ClipT } from 'src/api/types/ClipT';
import { UserProfileT } from 'src/api/types/UserProfileT';
import { createUUID } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

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
  ownerId: string;
  slug: string;
};

export const createPlaylist = (values: ObjT): PlaylistT => {
  return initRS({
    id: createUUID(),
    name: 'New playlist',
    slug: 'new-playlist',
  }) as PlaylistT;
};
