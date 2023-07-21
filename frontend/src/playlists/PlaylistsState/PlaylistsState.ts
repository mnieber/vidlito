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
} from 'skandha-facets';
import { PlaylistPdT } from '/src/api/types/PlaylistPdT';
import { PlaylistSettingsT } from '/src/api/types/PlaylistSettingsT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { DeletionWithFlag } from '/src/clips/ClipsState/facets/DeletionWithFlag';
import { Following } from '/src/playlists/PlaylistsState/facets/Following';
import { PlaylistStore } from '/src/playlists/PlaylistsState/facets/PlaylistStore';
import { registerPdCtr } from '/src/playlists/PlaylistsState/registerPdCtr';
import { registerPlaylistSettingsCtr } from '/src/playlists/PlaylistsState/registerPlaylistSettingsCtr';
import { registerPlaylistsCtr } from '/src/playlists/PlaylistsState/registerPlaylistsCtr';
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
    store: new PlaylistStore(),
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
      playlistsCtr: Skandha.getCtrState(this.playlistsCtr),
      pdCtr: Skandha.getCtrState(this.pdCtr),
      settingsCtr: Skandha.getCtrState(this.settingsCtr),
    };
  }

  destroy() {
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;
    registerPlaylistsCtr(this);
    registerPdCtr(this);
    registerPlaylistSettingsCtr(this);
  }
}
