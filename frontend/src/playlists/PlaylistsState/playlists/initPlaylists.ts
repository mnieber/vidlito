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
import { PlaylistT } from 'src/api/types/PlaylistT';
import { PlaylistsState, PropsT } from 'src/playlists/PlaylistsState';

export const initPlaylists = (state: PlaylistsState, props: PropsT) => {
  const ctr = state.playlists;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.addition, {
    add: {
      storeLocation() {
        FacetPolicies.newItemsAreAddedBelowTheHighlight(ctr.addition);
      },
      createItem(this: AdditionCbs<PlaylistT>['add']) {
        return props.createPlaylist(this.values);
      },
      highlightNewItem() {
        ctr.selection.selectItem({ itemId: ctr.addition.item?.id });
        props.locationState.goToPlaylist(ctr.addition.item!);
        FacetPolicies.editingSetEnabled(ctr.addition);
      },
    },
    cancel: {
      restoreLocation() {
        FacetPolicies.editingSetDisabled(ctr.addition);
        props.locationState.goBack();
      },
    },
  } as AdditionCbs<PlaylistT>);

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
        const values = this.values;
        return props.savePlaylist(values).then(() => {
          FacetPolicies.newItemsAreConfirmedOnEditingSave(ctr.editing);
          props.locationState.goToPlaylist(values);
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
      insertItems(playlists: PlaylistT[]) {
        // TODO
        // props.savePlaylistOrdering(playlists);
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
