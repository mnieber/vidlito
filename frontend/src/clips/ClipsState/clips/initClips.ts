import { setCallbackMap } from 'aspiration';
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
import { handleSelectItem, SelectionCbs } from 'skandha-facets/Selection';
import { ClipT } from 'src/api/types/ClipT';
import { ClipsState, PropsT } from 'src/clips/ClipsState';

export const initClips = (state: ClipsState, props: PropsT) => {
  const ctr = state.clips;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.addition, {
    add: {
      storeLocation() {
        FacetPolicies.newItemsAreAddedBelowTheHighlight(ctr.addition);
      },
      createItem(this: AdditionCbs<ClipT>['add']) {
        return props.createClip(this.values);
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
        return props.deleteClips(this.itemIds);
      },
    },
  } as DeletionCbs);

  setCallbackMap(ctr.editing, {
    save: {
      saveItem(this: EditingCbs['save']) {
        const values = this.values;
        return props.saveClip(values).then((localClip: ClipT) => {
          FacetPolicies.newItemsAreConfirmedOnEditingSave(ctr.editing);
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
