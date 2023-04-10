import * as R from 'ramda';
import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
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
  insertionPreviewUsesDragSources,
} from 'skandha-facets/policies';
import { registerCtr } from 'skandha-mobx';
import { ClipT } from 'src/api/types/ClipT';
import { Move } from 'src/clips/ClipsState/facets/Move';
import { isUpdating } from 'src/resourceStates/getState';
import { getIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { initClips } from './clips';

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
    addition: new Addition<ClipT>(),
    deletion: new Deletion(),
    display: new Display<ClipT>(),
    dragAndDrop: new DragAndDrop(),
    edit: new Edit(),
    highlight: new Highlight<ClipT>(),
    insertion: new Insertion<ClipT>(),
    move: new Move(),
    selection: new Selection<ClipT>(),
    store: new Store<ClipT>(),
  };

  _clipsMapData(props: PropsT) {
    const getClipById = (x: string | undefined) =>
      x ? this.clipsCtr.display.itemById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.clipsCtr.selection, 'selectableIds'],
        () => getIds(this.clipsCtr.display.items)
      ),
      pmap(
        //
        [this.clipsCtr.selection, 'items'],
        () => this.clipsCtr.selection.ids.map(getClipById as any)
      ),
      pmap(
        //
        [this.clipsCtr.highlight, 'highlightableIds'],
        () => getIds(this.clipsCtr.display.items)
      ),
      pmap(
        //
        [this.clipsCtr.highlight, 'item'],
        () => getClipById(this.clipsCtr.highlight.id)
      ),
      pmap(
        //
        [this.clipsCtr.insertion, 'inputItems'],
        () => this.clipsCtr.store.items ?? []
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
        [this.clipsCtr.deletion, 'disabled'],
        () => R.any((x: ClipT) => isUpdating(x), this.clipsCtr.selection.items)
      ),
      pmap(
        //
        [this.clipsCtr.display, 'items'],
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
