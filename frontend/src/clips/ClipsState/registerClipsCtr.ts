import { setCallbackMap } from 'aspiration';
import * as R from 'ramda';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { mapDataToProps } from 'skandha';
import {
  AdditionCbs,
  DeletionCbs,
  EditCbs,
  HighlightCbs,
  InsertionCbs,
  Selection,
  SelectionCbs,
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
import { isUpdating } from '/src/api/getState';
import { ClipT } from '/src/api/types/ClipT';
import { ClipsState } from '/src/clips/ClipsState';
import { MoveCbs } from '/src/clips/ClipsState/facets/Move';
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
};

const setCallbacks = (state: ClipsState) => {
  const ctr = state.clipsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.addition, {
    add: {
      stageAdd() {
        ctr.addition.parentId = ctr.highlight.id || topOfTheList;
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
  } as AdditionCbs<ClipT>);

  setCallbackMap(ctr.deletion, {
    delete: {
      deleteItems(this: DeletionCbs['delete']) {
        const clipIds = this.args.itemIds;
        if (this.args.moveToTrash) {
          const allIds = [...ctr.highlight.highlightableIds];

          return state.props
            .moveClipsToTrash(clipIds)
            .then((response: ObjT) => {
              unselectIds(ctr.selection, clipIds);
              correctHighlight(
                ctr.highlight,
                allIds,
                R.without(clipIds, allIds)
              );
              return response;
            });
        }
        return Promise.resolve();
      },
    },
  } as DeletionCbs);

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return state.props
          .saveClip(this.args.values)
          .then((localClip: ClipT) => {
            ctr.addition.confirm();
            return localClip;
          });
      },
    },
    cancel: {
      onCancel() {
        ctr.addition.cancel();
      },
    },
  } as EditCbs);

  setCallbackMap(ctr.highlight, {
    highlightItem: {
      enter(this: HighlightCbs['highlightItem']) {
        // Cancel adding a new item on highlight change
        if (ctr.addition.item && ctr.addition.item.id !== this.args.id) {
          ctr.addition.cancel();
        }
      },
    },
  } as HighlightCbs);

  setCallbackMap(ctr.insertion, {
    insertItems: {
      insertItems(clips: ClipT[]) {
        state.props.saveClipOrdering(clips);
      },
    },
  } as InsertionCbs);

  setCallbackMap(ctr.move, {
    move: {
      moveItems(this: MoveCbs['move']) {
        const allIds = [...ctr.highlight.highlightableIds];
        const clips = [...ctr.selection.items];
        const clipIds = [...ctr.selection.ids];

        return state.props
          .moveClipsToPlaylist(
            clips,
            this.args.playlistId,
            this.args.playlistSlug,
            this.args.copy
          )
          .then((response: ObjT) => {
            unselectIds(ctr.selection, clipIds);
            correctHighlight(ctr.highlight, allIds, R.without(clipIds, allIds));
            return response;
          });
      },
    },
  } as MoveCbs);

  setCallbackMap(ctr.selection, {
    selectItem: {
      selectItem(this: SelectionCbs['selectItem']) {
        handleSelectItem(ctr.selection, this.args);
        // Highlight follows selection
        if (!this.args.isCtrl && !this.args.isShift) {
          ctr.highlight.highlightItem({ id: this.args.itemId });
        }
      },
    },
  } as SelectionCbs);
};

export const unselectIds = (selection: Selection, ids: string[]) => {
  for (const id of ids) {
    if (selection.ids.includes(id)) {
      selection.selectItem({ itemId: id, isCtrl: true });
    }
  }
};

export const registerClipsCtr = (state: ClipsState) => {
  registerCtr({
    ctr: state.clipsCtr,
    options: { name: 'ClipsState.Clips' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
