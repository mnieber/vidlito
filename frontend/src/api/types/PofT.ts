import { FolderT } from '/src/api/types/FolderT';
import { PlaylistT } from '/src/api/types/PlaylistT';

export type PofT = {
  id: string;
  playlist?: PlaylistT;
  folder?: FolderT;
};
