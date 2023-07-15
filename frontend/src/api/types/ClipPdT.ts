import { initRS } from '/src/resourceStates';
import { createUUID } from '/src/utils/ids';

export type ClipPdT = {
  id: string;
  description?: string;
  tags: string[];
};

export type ClipPdFormT = {
  id: string;
  description?: string;
  tags: string[];
};

export const createClipPd = (): ClipPdT => {
  return initRS({
    id: createUUID(),
    description: '',
    tags: [],
  } as ClipPdT);
};
