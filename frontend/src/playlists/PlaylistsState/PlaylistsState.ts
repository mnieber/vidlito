import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
import { Addition } from 'skandha-facets/Addition';
import { Deletion } from 'skandha-facets/Deletion';
import { DragAndDrop } from 'skandha-facets/DragAndDrop';
import { Editing } from 'skandha-facets/Editing';
import { Highlight } from 'skandha-facets/Highlight';
import { Insertion } from 'skandha-facets/Insertion';
import * as FacetPolicies from 'skandha-facets/policies';
import { Selection } from 'skandha-facets/Selection';
import { registerCtr } from 'skandha-mobx';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { getIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { initPlaylists, PlaylistsData } from './playlists';

export type PropsT = {
  deletePlaylists: (ids: string[]) => Promise<any>;
  savePlaylist: (values: ObjT) => Promise<PlaylistT>;
  savePlaylistOrdering: (playlists: PlaylistT[]) => Promise<any>;
  createPlaylist: (values: ObjT) => PlaylistT;
};

export class PlaylistsState {
  playlists = {
    data: new PlaylistsData(),
    addition: new Addition<PlaylistT>(),
    deletion: new Deletion(),
    dragAndDrop: new DragAndDrop(),
    editing: new Editing(),
    highlight: new Highlight<PlaylistT>(),
    insertion: new Insertion<PlaylistT>(),
    selection: new Selection<PlaylistT>(),
  };

  _playlistsMapData(props: PropsT) {
    const getPlaylistById = (x: string | undefined) =>
      x ? this.playlists.data.playlistById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.playlists.selection, 'selectableIds'],
        () => getIds(this.playlists.data.playlistsDisplay)
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
      ),
      pmap(
        //
        [this.playlists.insertion, 'inputItems'],
        () => this.playlists.data.playlists
      ),
      pmap(
        //
        [this.playlists.insertion, 'preview'],
        () =>
          FacetPolicies.insertionPreviewUsesDragSources(
            [FacetPolicies.DragSourceFromNewItem],
            this.playlists
          )(this.playlists.insertion.inputItems)
      ),
      pmap(
        //
        [this.playlists.data, 'playlistsDisplay'],
        () => this.playlists.insertion.preview
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
