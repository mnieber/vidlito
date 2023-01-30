import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
import { Addition } from 'skandha-facets/Addition';
import { Deletion } from 'skandha-facets/Deletion';
import { Editing } from 'skandha-facets/Editing';
import { Highlight } from 'skandha-facets/Highlight';
import { Selection } from 'skandha-facets/Selection';
import { registerCtr } from 'skandha-mobx';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { getIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { initPlaylists, PlaylistsData } from './playlists';

export type PropsT = {
  deletePlaylists: (ids: string[]) => Promise<any>;
  savePlaylist: (values: ObjT) => Promise<any>;
  createPlaylist: (values: ObjT) => PlaylistT;
  updatePlaylistUrl: (playlist: PlaylistT) => void;
};

export class PlaylistsState {
  playlists = {
    data: new PlaylistsData(),
    addition: new Addition<PlaylistT>(),
    deletion: new Deletion(),
    editing: new Editing(),
    highlight: new Highlight<PlaylistT>(),
    selection: new Selection<PlaylistT>(),
  };

  _playlistsMapData(props: PropsT) {
    const getPlaylistById = (x: string | undefined) =>
      x ? this.playlists.data.playlistById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.playlists.selection, 'selectableIds'],
        () => getIds(this.playlists.data.playlists)
      ),
      pmap(
        //
        [this.playlists.selection, 'items'],
        () => this.playlists.selection.ids.map(getPlaylistById as any)
      ),
      pmap(
        //
        [this.playlists.highlight, 'item'],
        () => getPlaylistById(this.playlists.highlight.id)
      )
    );
  }

  getSummary() {
    return {
      playlists: Skandha.getCtrState(this.playlists),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    registerCtr({
      ctr: this.playlists,
      options: { name: 'PlaylistsState.Playlists' },
      initCtr: () => {
        initPlaylists(this, props);
        this._playlistsMapData(props);
      },
    });
  }
}
