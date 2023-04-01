import { ObjT } from 'src/utils/types';

export type ActionT = {
  data: ObjT;
  id: string;
  playlistId: string;
  type: 'TrashEntries' | 'TrashPlaylist';
};

export type ActionByIdT = { [id: string]: ActionT };
