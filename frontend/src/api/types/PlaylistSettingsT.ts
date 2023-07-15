import { initRS } from '/src/resourceStates';
import { createUUID } from '/src/utils/ids';

export type PlaylistSettingsT = {
  id: string;
  isPublic: boolean;
};

export type PlaylistSettingsFormT = {
  id: string;
  isPublic: boolean;
};

export const createPlaylistSettings = (): PlaylistSettingsT => {
  return initRS({
    id: createUUID(),
    isPublic: false,
  } as PlaylistSettingsT);
};
