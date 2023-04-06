import { setCallbackMap } from 'aspiration';
import * as R from 'ramda';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
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
import { correctHighlight } from 'skandha-facets/policies';
import { ClipT } from 'src/api/types/ClipT';
import { ClipsState, PropsT } from 'src/clips/ClipsState';
import { ObjT } from 'src/utils/types';

export const initClips = (state: ClipsState, props: PropsT) => {
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
      unstageAdd() {
        ctr.edit.cancel();
      },
    },
  } as AdditionCbs<ClipT>);

  setCallbackMap(ctr.deletion, {
    delete: {
      deleteItems(this: DeletionCbs['delete']) {
        const clipIds = this.itemIds;
        if (this.options?.moveToTrash) {
          return props.moveClipsToTrash(clipIds).then((response: ObjT) => {
            const allIds = R.keys(ctr.store.itemById);
            unselectIds(ctr.selection, clipIds);

            correctHighlight(
              ctr.highlight,
              allIds,
              R.without(clipIds, ctr.highlight.highlightableIds)
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
        return props.saveClip(this.values).then((localClip: ClipT) => {
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
        if (ctr.addition.item && ctr.addition.item.id !== this.id) {
          ctr.addition.cancel();
        }
      },
    },
  } as HighlightCbs);

  setCallbackMap(ctr.insertion, {
    insertItems: {
      insertItems(clips: ClipT[]) {
        props.saveClipOrdering(clips);
      },
    },
  } as InsertionCbs);

  setCallbackMap(ctr.selection, {
    selectItem: {
      selectItem(this: SelectionCbs['selectItem']) {
        handleSelectItem(ctr.selection, this.selectionParams);
        // Highlight follows selection
        if (!this.selectionParams.isCtrl && !this.selectionParams.isShift) {
          ctr.highlight.highlightItem(this.selectionParams.itemId);
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
