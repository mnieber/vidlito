import { isUpdating } from 'mobx-resource-states';
import * as R from 'ramda';
import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import { Selection } from 'skandha-facets';
import {
  DragSourceFromNewItem,
  createInsertionPreview,
} from 'skandha-facets/policies';
import { registerCtr } from 'skandha-mobx';
import { ClipT } from '/src/api/types/ClipT';
import { ClipsState } from '/src/clips/ClipsState';
import { getIds } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

const mapData = (state: ClipsState) => {
  const ctr = state.clipsCtr;

  const getClipById = (x: string | undefined) =>
    x ? ctr.display.itemById[x] : undefined;

  mapDataToProps(ctr, {
    store: {
      items: () => state.props.getClips(),
    },
    selection: {
      selectableIds: () => getIds(ctr.display.items),
      items: () =>
        ctr.selection.itemIds
          .map(getClipById)
          .filter((x?: ClipT) => !!x) as ClipT[],
    },
    highlight: {
      highlightableIds: () => getIds(ctr.display.items),
      item: () => getClipById(ctr.highlight.itemId),
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
      block: () => R.any((x: ClipT) => isUpdating(x), ctr.selection.items),
    },
    display: {
      items: () => ctr.insertion.preview,
    },
  });
};

const setCallbacks = (state: ClipsState) => {
  const ctr = state.clipsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));







};

export const unselectIds = (selection: Selection, ids: string[]) => {
  for (const id of ids) {
    if (selection.itemIds.includes(id)) {
      selection.selectItem({ itemId: id, isCtrl: true });
    }
  }
};

export const registerClipsCtr = (state: ClipsState) => {
  registerCtr({
    ctr: state.clipsCtr,
    options: { name: 'ClipsState.Clips' },
    initCtr: () => {
      mapData(state);
      setCallbacks(state);
    },
  });
};
