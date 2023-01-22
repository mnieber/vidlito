import { setCallbackMap } from 'aspiration';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { DeletionCbs } from 'skandha-facets/Deletion';
import { EditingCbs } from 'skandha-facets/Editing';
import { HighlightCbs } from 'skandha-facets/Highlight';
import * as FacetPolicies from 'skandha-facets/policies';
import { handleSelectItem, SelectionCbs } from 'skandha-facets/Selection';
import { PlaylistsState, PropsT } from 'src/playlists/PlaylistsState';

export const initPlaylists = (state: PlaylistsState, props: PropsT) => {
  const ctr = state.playlists;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.deletion, {
    delete: {
      deleteItems(this: DeletionCbs['delete']) {
        return props.deletePlaylists(this.itemIds);
      },
    },
  } as DeletionCbs);

  setCallbackMap(ctr.editing, {
    save: {
      saveItem(this: EditingCbs['save']) {
        return props.savePlaylist(this.values).then(() => {
          FacetPolicies.newItemsAreConfirmedOnEditingSave(
            ctr.editing,
            this.values
          );
        });
      },
      refreshView() {
        if (ctr.highlight.item) {
          // Moonleap Todo: move to the new playlist
        }
      },
    },
    cancel: {
      enter() {
        FacetPolicies.newItemsAreCancelledOnEditingCancel(ctr.editing);
      },
    },
  } as EditingCbs);

  setCallbackMap(ctr.highlight, {} as HighlightCbs);

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
