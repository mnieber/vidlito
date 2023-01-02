import { ClipT } from 'src/api/types/ClipT';
import { EntryT } from 'src/api/types/EntryT';

export type PlaylistT = {
  clipSet: ClipT[];
  description?: string;
  entrySet: EntryT[];
  id: string;
  name: string;
  slug: string;
};

export type PlaylistByIdT = { [id: string]: PlaylistT };

export type PlaylistFormT = {
  description?: string;
  name: string;
  slug: string;
  id: string;
};
