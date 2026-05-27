import { type Cbs } from 'aspiration';
import { isUpdating } from 'mobx-resource-states';
import * as R from 'ramda';
import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import {
  Edit,
  Highlight,
  Selection,
  handleSelectItem,
  topOfTheList,
} from 'skandha-facets';
import * as FacetPolicies from 'skandha-facets/policies';
import {
  DragSourceFromNewItem,
  correctHighlight,
  createInsertionPreview,
} from 'skandha-facets/policies';
import { registerCtr } from 'skandha-mobx';
import { ClipT } from '/src/api/types/ClipT';
import { ClipsState } from '/src/clips/ClipsState';
import { Move } from '/src/clips/ClipsState/facets/Move';
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

  ctr.addition.callbackMap = {
    add: {
      stageAdd() {
        ctr.addition.parentId = ctr.highlight.itemId || topOfTheList;
      },
      highlightNewItem() {
        ctr.selection.selectItem({ itemId: ctr.addition.item?.id });
        ctr.edit.enable();
      },
    },
    cancel: {
      unstageAdd(parentId: string | undefined) {
        ctr.edit.cancel();
        // The UI will restore the previous url
      },
    },
    confirm: {
      confirmAdd() {
        FacetPolicies.newItemsAreInsertedWhenConfirmed(ctr.addition);
      },
    },
  };


  ctr.edit.callbackMap = {
    save: {
      saveItem(this: Cbs<Edit['save']>) {
        return state.props.saveClip(this.args.values).then((response: ObjT) => {
          ctr.addition.confirm();
          return response;
        });
      },
    },
    cancel: {
      onCancel() {
        ctr.addition.cancel();
      },
    },
  };

  ctr.highlight.callbackMap = {
    set: {
      enter(this: Cbs<Highlight['set']>) {
        // Cancel adding a new item on highlight change
        if (ctr.addition.item && ctr.addition.item.id !== this.args.itemId) {
          ctr.addition.cancel();
        }
      },
    },
  };

  ctr.insertion.callbackMap = {
    insertItems: {
      insertItems(clips: ClipT[]) {
        state.props.saveClipOrdering(clips);
      },
    },
  };

  ctr.move.callbackMap = {
    move: {
      moveItems(this: Cbs<Move['move']>) {
        const allIds = [...ctr.highlight.highlightableIds];
        const clips = [...ctr.selection.items];
        const clipIds = [...ctr.selection.itemIds];

        return state.props
          .moveClipsToPlaylist(clips, this.args.playlistId, this.args.copy)
          .then((response: ObjT) => {
            unselectIds(ctr.selection, clipIds);
            correctHighlight(ctr.highlight, allIds, R.without(clipIds, allIds));
            return response;
          });
      },
    },
  };

  ctr.selection.callbackMap = {
    selectItem: {
      selectItem(this: Cbs<Selection['selectItem']>) {
        handleSelectItem(ctr.selection, this.args);
        // Highlight follows selection
        if (!this.args.isCtrl && !this.args.isShift) {
          ctr.highlight.set({ itemId: this.args.itemId });
        }
      },
    },
  };
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
