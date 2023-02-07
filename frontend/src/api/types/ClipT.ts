import { initRS } from 'src/api/ResourceState';
import { createUUID } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type ClipT = {
  description?: string;
  endTimeMs?: number;
  id: string;
  name: string;
  slug: string;
  startTimeMs?: number;
  tags: string[];
  url?: string;
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

export const createClip = (values: ObjT): ClipT => {
  return initRS({
    id: createUUID(),
    name: 'New clip',
    slug: 'new-clip',
  }) as ClipT;
};
