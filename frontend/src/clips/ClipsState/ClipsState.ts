import * as R from 'ramda';
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
  Store,
} from 'skandha-facets';
import {
  DragSourceFromNewItem,
  createInsertionPreview,
} from 'skandha-facets/policies';
import { registerCtr } from 'skandha-mobx';
import { initClips } from './clips';
import { isUpdating } from '/src/api/getState';
import { ClipPDT } from '/src/api/types/ClipPDT';
import { ClipT } from '/src/api/types/ClipT';
import { initClipPD } from '/src/clips/ClipsState/clips/initClipPD';
import { ClipPDStore } from '/src/clips/ClipsState/facets/ClipPDStore';
import { Move } from '/src/clips/ClipsState/facets/Move';
import { getIds } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  moveClipsToTrash: (ids: string[]) => Promise<any>;
  saveClip: (values: ObjT) => Promise<ClipT>;
  saveClipPD: (values: ObjT) => Promise<ClipPDT>;
  saveClipOrdering: (clips: ClipT[]) => Promise<any>;
  moveClipsToPlaylist: (
    clips: ClipT[],
    playlistId: string,
    playlistSlug: string,
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
    hovering: new Hovering(),
    insertion: new Insertion<ClipT>(),
    move: new Move(),
    selection: new Selection<ClipT>(),
    store: new Store<ClipT>(),
  };

  clipPDCtr = {
    edit: new Edit(),
    store: new ClipPDStore(),
  };

  _clipsMapData(props: PropsT) {
    const ctr = this.clipsCtr;

    const getClipById = (x: string | undefined) =>
      x ? ctr.display.itemById[x] : undefined;

    mapDataToProps(ctr, {
      selection: {
        selectableIds: () => getIds(ctr.display.items),
        items: () =>
          ctr.selection.ids
            .map(getClipById)
            .filter((x?: ClipT) => !!x) as ClipT[],
      },
      highlight: {
        highlightableIds: () => getIds(ctr.display.items),
        item: () => getClipById(ctr.highlight.id),
      },
      insertion: {
        inputItems: () => ctr.store.items ?? [],
        preview: () =>
          createInsertionPreview(
            [DragSourceFromNewItem],
            ctr
          )(ctr.insertion.inputItems),
      },
      deletion: {
        disabled: () => R.any((x: ClipT) => isUpdating(x), ctr.selection.items),
      },
      display: {
        items: () => ctr.insertion.preview,
      },
    });
  }

  _clipPDMapData(props: PropsT) {}

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

    registerCtr({
      ctr: this.clipPDCtr,
      options: { name: 'ClipsState.ClipPD' },
      initCtr: () => {
        initClipPD(this, props);
        this._clipPDMapData(props);
      },
    });
  }
}
