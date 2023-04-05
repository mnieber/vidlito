import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
import {
  Addition,
  Deletion,
  DragAndDrop,
  Edit,
  Highlight,
  Insertion,
  Selection,
} from 'skandha-facets';
import {
  DragSourceFromNewItem,
  insertionPreviewUsesDragSources,
} from 'skandha-facets/policies';
import { registerCtr } from 'skandha-mobx';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { getIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { Settings } from './Settings';
import { PlaylistsData, initPlaylists } from './playlists';

export type PropsT = {
  deletePlaylists: (ids: string[]) => Promise<any>;
  savePlaylist: (values: ObjT) => Promise<PlaylistT>;
  savePlaylistOrdering: (playlists: PlaylistT[]) => Promise<any>;
};

export class PlaylistsState {
  settings = new Settings();

  playlistsCtr = {
    data: new PlaylistsData(),
    addition: new Addition<PlaylistT>(),
    deletion: new Deletion(),
    dragAndDrop: new DragAndDrop(),
    edit: new Edit(),
    highlight: new Highlight<PlaylistT>(),
    insertion: new Insertion<PlaylistT>(),
    selection: new Selection<PlaylistT>(),
  };

  _playlistsMapData(props: PropsT) {
    const getPlaylistById = (x: string | undefined) =>
      x ? this.playlistsCtr.data.playlistById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.playlistsCtr.selection, 'selectableIds'],
        () => getIds(this.playlistsCtr.data.playlistsDisplay)
      ),
      pmap(
        //
        [this.playlistsCtr.selection, 'items'],
        () => this.playlistsCtr.selection.ids.map(getPlaylistById as any)
      ),
      pmap(
        //
        [this.playlistsCtr.highlight, 'item'],
        () => getPlaylistById(this.playlistsCtr.highlight.id)
      ),
      pmap(
        //
        [this.playlistsCtr.insertion, 'inputItems'],
        () => this.playlistsCtr.data.playlists
      ),
      pmap(
        //
        [this.playlistsCtr.insertion, 'preview'],
        () =>
          insertionPreviewUsesDragSources(
            [DragSourceFromNewItem],
            this.playlistsCtr
          )(this.playlistsCtr.insertion.inputItems)
      ),
      pmap(
        //
        [this.playlistsCtr.data, 'playlistsDisplay'],
        () => this.playlistsCtr.insertion.preview
      )
    );
  }

  getSummary() {
    return {
      playlistsCtr: Skandha.getCtrState(this.playlistsCtr),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    registerCtr({
      ctr: this.playlistsCtr,
      options: { name: 'PlaylistsState.Playlists' },
      initCtr: () => {
        initPlaylists(this, props);
        this._playlistsMapData(props);
      },
    });
  }
}
