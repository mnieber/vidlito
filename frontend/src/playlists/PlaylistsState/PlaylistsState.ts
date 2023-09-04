import * as Skandha from 'skandha';
import {
  Addition,
  Display,
  DragAndDrop,
  Edit,
  Highlight,
  Hovering,
  Insertion,
  Selection,
  Store,
} from 'skandha-facets';
import { Following } from './facets/Following';
import { registerPdCtr } from './registerPdCtr';
import { registerPlaylistsCtr } from './registerPlaylistsCtr';
import { registerSettingsCtr } from './registerSettingsCtr';
import { PlaylistPdT } from '/src/api/types/PlaylistPdT';
import { PlaylistSettingsT } from '/src/api/types/PlaylistSettingsT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { DeletionWithFlag } from '/src/clips/ClipsState/facets/DeletionWithFlag';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  getPlaylists: () => PlaylistT[];
  followPlaylist: (playlist: PlaylistT, flag: boolean) => void;
  getFollowedPlaylists: () => PlaylistT[];
  deletePlaylists: (ids: string[]) => Promise<any>;
  savePlaylist: (values: ObjT) => Promise<PlaylistT>;
  savePlaylistPd: (values: ObjT) => Promise<PlaylistPdT>;
  savePlaylistSettings: (values: ObjT) => Promise<PlaylistSettingsT>;
  savePlaylistOrdering: (playlists: PlaylistT[]) => Promise<any>;
};

export class PlaylistsState {
  props: PropsT;

  playlistsCtr = {
    addition: new Addition<PlaylistT>(),
    deletion: new DeletionWithFlag(),
    display: new Display<PlaylistT>(),
    dragAndDrop: new DragAndDrop(),
    edit: new Edit(),
    highlight: new Highlight<PlaylistT>(),
    hovering: new Hovering(),
    insertion: new Insertion<PlaylistT>(),
    selection: new Selection<PlaylistT>(),
    store: new Store<PlaylistT>(),
  };

  pdCtr = {
    edit: new Edit(),
  };

  settingsCtr = {
    edit: new Edit(),
    following: new Following(),
  };

  getSummary() {
    return {
      playlists: Skandha.getCtrState(this.playlistsCtr),
      pd: Skandha.getCtrState(this.pdCtr),
      settings: Skandha.getCtrState(this.settingsCtr),
    };
  }

  destroy() {
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;
    registerPlaylistsCtr(this);
    registerPdCtr(this);
    registerSettingsCtr(this);
  }
}
