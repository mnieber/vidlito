import { ClipT } from '/src/api/types/ClipT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { initRS } from '/src/resourceStates';
import { createUUID } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

export type PlaylistT = {
  clipSet: ClipT[];
  description?: string;
  id: string;
  name: string;
  nrOfClips: number;
  owner: UserProfileT;
  slug: string;
  tags: string[];
};

export type PlaylistByIdT = { [id: string]: PlaylistT };

export type PlaylistFormT = {
  description?: string;
  id: string;
  name: string;
  ownerId: string;
  slug: string;
  tags: string[];
};

export type PlaylistPDFormT = {
  id: string;
  description?: string;
  tags: string[];
};

export const createPlaylist = (me: UserProfileT, values: ObjT): PlaylistT => {
  return initRS({
    clipSet: [],
    id: createUUID(),
    name: 'New playlist',
    nrOfClips: 0,
    owner: me,
    slug: 'new-playlist',
    tags: [],
  } as PlaylistT);
};

export const removeClips = (
  playlist: PlaylistT,
  clipIds: string[]
): PlaylistT => {
  return {
    ...playlist,
    clipSet: playlist.clipSet.filter(
      (clip: ClipT) => !clipIds.includes(clip.id)
    ),
  };
};
