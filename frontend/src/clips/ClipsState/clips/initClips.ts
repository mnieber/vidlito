import { setCallbackMap } from 'aspiration';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { DeletionCbs } from 'skandha-facets/Deletion';
import { HighlightCbs } from 'skandha-facets/Highlight';
import { InsertionCbs } from 'skandha-facets/Insertion';
import * as FacetPolicies from 'skandha-facets/policies';
import { handleSelectItem, SelectionCbs } from 'skandha-facets/Selection';
import { ClipT } from 'src/api/types/ClipT';
import { ClipsState, PropsT } from 'src/clips/ClipsState';

export const initClips = (state: ClipsState, props: PropsT) => {
  const ctr = state.clips;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.deletion, {
    delete: {
      deleteItems(this: DeletionCbs['delete']) {
        return props.deleteClips(this.itemIds);
      },
    },
  } as DeletionCbs);

  setCallbackMap(ctr.highlight, {} as HighlightCbs);

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
