import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import {
  Addition,
  Deletion,
  Display,
  DragAndDrop,
  Edit,
  Highlight,
  Hovering,
  Insertion,
  Selection,
} from 'skandha-facets';
import { PlaylistPDT } from '/src/api/types/PlaylistPDT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistPDStore } from '/src/playlists/PlaylistsState/facets/PlaylistPDStore';
import { PlaylistStore } from '/src/playlists/PlaylistsState/facets/PlaylistsStore';
import { registerPlaylistPDCtr } from '/src/playlists/PlaylistsState/registerPlaylistPDCtr';
import { registerPlaylistsCtr } from '/src/playlists/PlaylistsState/registerPlaylistsCtr';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  deletePlaylists: (ids: string[]) => Promise<any>;
  savePlaylist: (values: ObjT) => Promise<PlaylistT>;
  savePlaylistPD: (values: ObjT) => Promise<PlaylistPDT>;
  savePlaylistOrdering: (playlists: PlaylistT[]) => Promise<any>;
};

export class PlaylistsState {
  playlistsCtr = {
    addition: new Addition<PlaylistT>(),
    deletion: new Deletion(),
    display: new Display<PlaylistT>(),
    dragAndDrop: new DragAndDrop(),
    edit: new Edit(),
    highlight: new Highlight<PlaylistT>(),
    hovering: new Hovering(),
    insertion: new Insertion<PlaylistT>(),
    selection: new Selection<PlaylistT>(),
    store: new PlaylistStore(),
  };

  playlistPDCtr = {
    edit: new Edit(),
    store: new PlaylistPDStore(),
  };

  getSummary() {
    return {
      playlistsCtr: Skandha.getCtrState(this.playlistsCtr),
      playlistPDCtr: Skandha.getCtrState(this.playlistPDCtr),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    registerPlaylistsCtr(this, props);
    registerPlaylistPDCtr(this, props);
  }
}
