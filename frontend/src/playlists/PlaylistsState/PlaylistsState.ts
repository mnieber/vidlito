import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps } from 'skandha';
import {
  Addition,
  Deletion,
  Display,
  DragAndDrop,
  Edit,
  Highlight,
  Insertion,
  Selection,
  Store,
} from 'skandha-facets';
import {
  DragSourceFromNewItem,
  createInsertionPreview,
} from 'skandha-facets/policies';
import { registerCtr } from 'skandha-mobx';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { getIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { Settings } from './Settings';
import { initPlaylists } from './playlists';

export type PropsT = {
  deletePlaylists: (ids: string[]) => Promise<any>;
  savePlaylist: (values: ObjT) => Promise<PlaylistT>;
  savePlaylistOrdering: (playlists: PlaylistT[]) => Promise<any>;
};

export class PlaylistsState {
  settings = new Settings();

  playlistsCtr = {
    addition: new Addition<PlaylistT>(),
    deletion: new Deletion(),
    display: new Display<PlaylistT>(),
    dragAndDrop: new DragAndDrop(),
    edit: new Edit(),
    highlight: new Highlight<PlaylistT>(),
    insertion: new Insertion<PlaylistT>(),
    selection: new Selection<PlaylistT>(),
    store: new Store<PlaylistT>(),
  };

  _playlistsMapData(props: PropsT) {
    const ctr = this.playlistsCtr;

    const getPlaylistById = (x: string | undefined) =>
      x ? ctr.display.itemById[x] : undefined;

    mapDataToProps(ctr, {
      selection: {
        selectableIds: () => getIds(ctr.display.items),
        items: () => ctr.selection.ids.map(getPlaylistById as any),
      },
      highlight: {
        item: () => getPlaylistById(ctr.highlight.id),
      },
      insertion: {
        inputItems: () => ctr.store.items ?? [],
        preview: () =>
          createInsertionPreview(
            [DragSourceFromNewItem],
            ctr
          )(ctr.insertion.inputItems),
      },
      display: {
        items: () => ctr.insertion.preview,
      },
    });
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
