import { initRS } from '/src/resourceStates';
import { createUUID } from '/src/utils/ids';

export type PlaylistPDT = {
  id: string;
  description?: string;
  tags: string[];
};

export type PlaylistPDFormT = {
  id: string;
  description?: string;
  tags: string[];
};

export const createPlaylistPD = (): PlaylistPDT => {
  return initRS({
    id: createUUID(),
    description: '',
    tags: [],
  } as PlaylistPDT);
};
