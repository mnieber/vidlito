import { initRS } from '/src/resourceStates';
import { createUUID } from '/src/utils/ids';

export type ClipPDT = {
  id: string;
  description?: string;
  tags: string[];
};

export type ClipPDFormT = {
  id: string;
  description?: string;
  tags: string[];
};

export const createClipPD = (): ClipPDT => {
  return initRS({
    id: createUUID(),
    description: '',
    tags: [],
  } as ClipPDT);
};
