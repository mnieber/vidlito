import { initRS } from 'mobx-resource-states';
import { createUUID } from '/src/utils/ids';

export type PlaylistPdT = {
  id: string;
  description?: string;
  tags: string[];
};

export type PlaylistPdFormT = {
  id: string;
  description?: string;
  tags: string[];
};

export const createPlaylistPd = (): PlaylistPdT => {
  return initRS({
    id: createUUID(),
    description: '',
    tags: [],
  } as PlaylistPdT);
};
