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
import { PlaylistStore } from '/src/playlists/PlaylistsState/facets/PlaylistStore';
import { registerPlaylistCtr } from '/src/playlists/PlaylistsState/registerPlaylistCtr';
import { registerPlaylistsCtr } from '/src/playlists/PlaylistsState/registerPlaylistsCtr';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  getPlaylists: () => PlaylistT[];
  getFollowedPlaylists: () => PlaylistT[];
  deletePlaylists: (ids: string[]) => Promise<any>;
  savePlaylist: (values: ObjT) => Promise<PlaylistT>;
  savePlaylistPD: (values: ObjT) => Promise<PlaylistPDT>;
  savePlaylistOrdering: (playlists: PlaylistT[]) => Promise<any>;
};

export class PlaylistsState {
  props: PropsT;

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

  playlistCtr = {
    pdEdit: new Edit(),
    settingsEdit: new Edit(),
  };

  getSummary() {
    return {
      playlistsCtr: Skandha.getCtrState(this.playlistsCtr),
      playlistCtr: Skandha.getCtrState(this.playlistCtr),
    };
  }

  destroy() {
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;
    registerPlaylistsCtr(this);
    registerPlaylistCtr(this);
  }
}
