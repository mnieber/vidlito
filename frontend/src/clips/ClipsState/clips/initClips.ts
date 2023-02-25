import { setCallbackMap } from 'aspiration';
import * as R from 'ramda';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { AdditionCbs } from 'skandha-facets/Addition';
import { DeletionCbs } from 'skandha-facets/Deletion';
import { EditingCbs } from 'skandha-facets/Editing';
import { HighlightCbs } from 'skandha-facets/Highlight';
import { InsertionCbs } from 'skandha-facets/Insertion';
import * as FacetPolicies from 'skandha-facets/policies';
import { correctHighlight } from 'skandha-facets/policies';
import { handleSelectItem, SelectionCbs } from 'skandha-facets/Selection';
import { ClipT } from 'src/api/types/ClipT';
import { ClipsState, PropsT } from 'src/clips/ClipsState';
import { ObjT } from 'src/utils/types';

export const initClips = (state: ClipsState, props: PropsT) => {
  const ctr = state.clips;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.addition, {
    add: {
      storeLocation() {
        FacetPolicies.newItemsAreAddedBelowTheHighlight(ctr.addition);
      },
      highlightNewItem() {
        ctr.selection.selectItem({ itemId: ctr.addition.item?.id });
        FacetPolicies.editingSetEnabled(ctr.addition);
      },
    },
    cancel: {
      restoreLocation() {
        FacetPolicies.editingSetDisabled(ctr.addition);
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
          FacetPolicies.newItemsAreConfirmedOnEditingSave(ctr.editing);
          return localClip;
        });
      },
    },
    cancel: {
      exit() {
        FacetPolicies.newItemsAreCancelledOnEditingCancel(ctr.editing);
      },
    },
  } as EditingCbs);

  setCallbackMap(ctr.highlight, {
    highlightItem: {
      enter(this: HighlightCbs['highlightItem']) {
        FacetPolicies.cancelNewItemOnHighlightChange(ctr.highlight, this.id);
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
        FacetPolicies.highlightFollowsSelection(
          ctr.selection,
          this.selectionParams
        );
      },
    },
  } as SelectionCbs);
};
