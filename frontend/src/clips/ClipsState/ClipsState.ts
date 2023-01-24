import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
import { Addition } from 'skandha-facets/Addition';
import { Deletion } from 'skandha-facets/Deletion';
import { DragAndDrop } from 'skandha-facets/DragAndDrop';
import { Editing } from 'skandha-facets/Editing';
import { Filtering } from 'skandha-facets/Filtering';
import { Highlight } from 'skandha-facets/Highlight';
import { Insertion } from 'skandha-facets/Insertion';
import { Selection } from 'skandha-facets/Selection';
import { registerCtr } from 'skandha-mobx';
import { ClipT } from 'src/api/types/ClipT';
import { getIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { ClipsData, initClips } from './clips';

export type PropsT = {
  deleteClips: (ids: string[]) => Promise<any>;
  saveClip: (values: ObjT) => Promise<any>;
  saveClipOrdering: (clips: ClipT[]) => Promise<any>;
};

export class ClipsState {
  clips = {
    data: new ClipsData(),
    addition: new Addition<ClipT>(),
    deletion: new Deletion(),
    dragAndDrop: new DragAndDrop(),
    editing: new Editing(),
    filtering: new Filtering<ClipT>(),
    highlight: new Highlight<ClipT>(),
    insertion: new Insertion<ClipT>(),
    selection: new Selection<ClipT>(),
  };

  _clipsMapData(props: PropsT) {
    const getClipById = (x: string | undefined) =>
      x ? this.clips.data.clipById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.clips.filtering, 'inputItems'],
        () => this.clips.data.clips
      ),
      pmap(
        //
        [this.clips.insertion, 'inputItems'],
        () => this.clips.data.clips
      ),
      pmap(
        //
        [this.clips.data, 'clipsDisplay'],
        () => this.clips.filtering.filteredItems
      ),
      pmap(
        //
        [this.clips.selection, 'selectableIds'],
        () => getIds(this.clips.data.clipsDisplay)
      ),
      pmap(
        //
        [this.clips.selection, 'items'],
        () => this.clips.selection.ids.map(getClipById as any)
      ),
      pmap(
        //
        [this.clips.highlight, 'item'],
        () => getClipById(this.clips.highlight.id)
      )
    );
  }

  getSummary() {
    return {
      clips: Skandha.getCtrState(this.clips),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    registerCtr({
      ctr: this.clips,
      options: { name: 'ClipsState.Clips' },
      initCtr: () => {
        initClips(this, props);
        this._clipsMapData(props);
      },
    });
  }
}
