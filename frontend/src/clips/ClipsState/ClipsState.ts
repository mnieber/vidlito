import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
import { Addition } from 'skandha-facets/Addition';
import { Deletion } from 'skandha-facets/Deletion';
import { DragAndDrop } from 'skandha-facets/DragAndDrop';
import { Editing } from 'skandha-facets/Editing';
import { Highlight } from 'skandha-facets/Highlight';
import { Insertion } from 'skandha-facets/Insertion';
import {
  DragSourceFromNewItem,
  insertionPreviewUsesDragSources,
} from 'skandha-facets/policies';
import { Selection } from 'skandha-facets/Selection';
import { registerCtr } from 'skandha-mobx';
import { ClipT } from 'src/api/types/ClipT';
import { getIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { ClipsData, initClips } from './clips';

export type PropsT = {
  moveClipsToTrash: (ids: string[]) => Promise<any>;
  saveClip: (values: ObjT) => Promise<ClipT>;
  saveClipOrdering: (clips: ClipT[]) => Promise<any>;
  moveClipsToPlaylist: (
    clips: ClipT[],
    playlistId: string,
    copy: boolean
  ) => Promise<any>;
};

export class ClipsState {
  props: PropsT;

  clipsCtr = {
    data: new ClipsData(),
    addition: new Addition<ClipT>(),
    deletion: new Deletion(),
    dragAndDrop: new DragAndDrop(),
    editing: new Editing(),
    highlight: new Highlight<ClipT>(),
    insertion: new Insertion<ClipT>(),
    selection: new Selection<ClipT>(),
  };

  moveClipsToPlaylist(playlistId: string, copy: boolean = false) {
    const clips = this.clipsCtr.selection.items;
    return this.props.moveClipsToPlaylist(clips, playlistId, copy);
  }

  _clipsMapData(props: PropsT) {
    const getClipById = (x: string | undefined) =>
      x ? this.clipsCtr.data.clipById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.clipsCtr.selection, 'selectableIds'],
        () => getIds(this.clipsCtr.data.clipsDisplay)
      ),
      pmap(
        //
        [this.clipsCtr.selection, 'items'],
        () => this.clipsCtr.selection.ids.map(getClipById as any)
      ),
      pmap(
        //
        [this.clipsCtr.highlight, 'item'],
        () => getClipById(this.clipsCtr.highlight.id)
      ),
      pmap(
        //
        [this.clipsCtr.insertion, 'inputItems'],
        () => this.clipsCtr.data.clips
      ),
      pmap(
        //
        [this.clipsCtr.insertion, 'preview'],
        () =>
          insertionPreviewUsesDragSources(
            [DragSourceFromNewItem],
            this.clipsCtr
          )(this.clipsCtr.insertion.inputItems)
      ),
      pmap(
        //
        [this.clipsCtr.data, 'clipsDisplay'],
        () => this.clipsCtr.insertion.preview
      )
    );
  }

  getSummary() {
    return {
      clips: Skandha.getCtrState(this.clipsCtr),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;

    registerCtr({
      ctr: this.clipsCtr,
      options: { name: 'ClipsState.Clips' },
      initCtr: () => {
        initClips(this, props);
        this._clipsMapData(props);
      },
    });
  }
}
