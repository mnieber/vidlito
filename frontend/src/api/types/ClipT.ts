import { UserProfileT } from '/src/api/types/UserProfileT';
import { initRS } from '/src/resourceStates';
import { createUUID } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

export type ClipT = {
  description?: string;
  endTimeMs?: number;
  id: string;
  name: string;
  nrOfPublicPlaylists: number;
  nrOfPrivatePlaylists: number;
  ownerUsername: string;
  slug: string;
  startTimeMs?: number;
  tags: string[];
  url?: string;
} & {
  isTransient?: boolean;
};

export type ClipByIdT = { [id: string]: ClipT };

export type ClipFormT = {
  description?: string;
  endTimeMs?: number;
  id: string;
  name: string;
  slug?: string;
  startTimeMs?: number;
  tags: string[];
  url?: string;
};

export const createClip = (me: UserProfileT, values: ObjT): ClipT => {
  return initRS({
    id: createUUID(),
    name: 'New clip',
    ownerUsername: me.username,
    slug: 'new-clip',
    isTransient: true,
    url: values.url ?? undefined,
  } as ClipT);
};
