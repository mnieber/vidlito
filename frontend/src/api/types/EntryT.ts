import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';

export type EntryT = {
  clip: ClipT;
  id: string;
  playlist: PlaylistT;
};

export type EntryByIdT = { [id: string]: EntryT };
