import * as Skandha from 'skandha';
import {
  Display,
  Edit,
  Hovering,
  Store,
} from 'skandha-facets';
import { PlaylistPdT } from '/src/api/types/PlaylistPdT';
import { PlaylistSettingsT } from '/src/api/types/PlaylistSettingsT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { ObjT } from '/src/utils/types';

// Local imports
import { Following } from './facets/Following';
import { PlaylistPdEdit } from './facets/PlaylistPdEdit';
import { PlaylistsAddition } from './facets/PlaylistsAddition';
import { PlaylistsDeletion } from './facets/PlaylistsDeletion';
import { PlaylistsDragAndDrop } from './facets/PlaylistsDragAndDrop';
import { PlaylistsEdit } from './facets/PlaylistsEdit';
import { PlaylistsHighlight } from './facets/PlaylistsHighlight';
import { PlaylistsInsertion } from './facets/PlaylistsInsertion';
import { PlaylistsSelection } from './facets/PlaylistsSelection';
import { registerPlaylistPdCtr } from './registerPlaylistPdCtr';
import { registerPlaylistSettingsCtr } from './registerPlaylistSettingsCtr';
import { registerPlaylistsCtr } from './registerPlaylistsCtr';

export type PropsT = {
  getPlaylists: () => PlaylistT[];
  followPlaylist: (playlist: PlaylistT, flag: boolean) => void;
  getFollowedPlaylists: () => PlaylistT[];
  deletePlaylists: (ids: string[]) => Promise<any>;
  savePlaylist: (values: ObjT) => Promise<PlaylistT>;
  savePlaylistOrdering: (playlists: PlaylistT[]) => Promise<any>;
  savePlaylistPd: (values: ObjT) => Promise<PlaylistPdT>;
  savePlaylistSettings: (values: ObjT) => Promise<PlaylistSettingsT>;
};

export class PlaylistsState {
  props: PropsT;

  playlistsCtr = {
    addition: new PlaylistsAddition(this),
    deletion: new PlaylistsDeletion(this),
    display: new Display<PlaylistT>(),
    dragAndDrop: new PlaylistsDragAndDrop(this),
    edit: new PlaylistsEdit(this),
    highlight: new PlaylistsHighlight(this),
    hovering: new Hovering(),
    insertion: new PlaylistsInsertion(this),
    selection: new PlaylistsSelection(this),
    store: new Store<PlaylistT>(),
  };

  playlistPdCtr = {
    edit: new PlaylistPdEdit(this),
  };

  playlistSettingsCtr = {
    edit: new Edit(),
    following: new Following(),
  };

  getSummary() {
    return {
      playlists: Skandha.getCtrState(this.playlistsCtr),
      playlistPd: Skandha.getCtrState(this.playlistPdCtr),
      playlistSettings: Skandha.getCtrState(this.playlistSettingsCtr),
    };
  }

  destroy() {
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;
    registerPlaylistsCtr(this);
    registerPlaylistPdCtr(this);
    registerPlaylistSettingsCtr(this);
  }
}
