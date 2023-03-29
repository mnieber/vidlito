import { setCallbackMap } from 'aspiration';
import * as R from 'ramda';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { topOfTheList } from 'skandha-facets';
import { AdditionCbs } from 'skandha-facets/Addition';
import { DeletionCbs } from 'skandha-facets/Deletion';
import { EditingCbs } from 'skandha-facets/Editing';
import { HighlightCbs } from 'skandha-facets/Highlight';
import { InsertionCbs } from 'skandha-facets/Insertion';
import { correctHighlight } from 'skandha-facets/policies';
import { handleSelectItem, SelectionCbs } from 'skandha-facets/Selection';
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
        ctr.editing.enable();
      },
    },
    cancel: {
      unstageAdd() {
        ctr.editing.cancel();
      },
    },
  } as AdditionCbs<ClipT>);

  setCallbackMap(ctr.deletion, {
    delete: {
      deleteItems(this: DeletionCbs['delete']) {
        const clipIds = this.itemIds;
        if (this.options?.moveToTrash) {
          return props.moveClipsToTrash(clipIds).then((response: ObjT) => {
            const allIds = R.keys(ctr.data.clipById);
            correctHighlight(
              ctr.highlight,
              allIds,
              allIds.filter((x) => x !== ctr.highlight.id)
            );
            return response;
          });
        }
        return Promise.resolve();
      },
    },
  } as DeletionCbs);

  setCallbackMap(ctr.editing, {
    save: {
      saveItem(this: EditingCbs['save']) {
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
  } as EditingCbs);

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
