import { ClipT } from '/src/api/types/ClipT';
import { createPlaylistPd, PlaylistPdT } from '/src/api/types/PlaylistPdT';
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
  ownerUsername: string;
  slug: string;
  tags: string[];
  playlistPd: PlaylistPdT;
  isPublic: boolean;
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

export const createPlaylist = (me: UserProfileT, values: ObjT): PlaylistT => {
  return initRS({
    clipSet: [],
    id: createUUID(),
    name: 'New playlist',
    nrOfClips: 0,
    ownerUsername: me.username,
    playlistPd: createPlaylistPd(),
    slug: 'new-playlist',
    tags: [],
    isPublic: false,
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
