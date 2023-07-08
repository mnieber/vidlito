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
  Hovering,
  Insertion,
  Selection,
} from 'skandha-facets';
import {
  DragSourceFromNewItem,
  createInsertionPreview,
} from 'skandha-facets/policies';
import { registerCtr } from 'skandha-mobx';
import { initPlaylists } from './playlists';
import { PlaylistPDT } from '/src/api/types/PlaylistPDT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistPDStore } from '/src/playlists/PlaylistsState/facets/PlaylistPDStore';
import { PlaylistStore } from '/src/playlists/PlaylistsState/facets/PlaylistsStore';
import { initPlaylistPD } from '/src/playlists/PlaylistsState/playlistPD/initPlaylistPD';
import { getIds } from '/src/utils/ids';
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

  _playlistPDMapData(props: PropsT) {}

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

    registerCtr({
      ctr: this.playlistPDCtr,
      options: { name: 'PlaylistsState.PlaylistPD' },
      initCtr: () => {
        initPlaylistPD(this, props);
        this._playlistPDMapData(props);
      },
    });
  }
}
