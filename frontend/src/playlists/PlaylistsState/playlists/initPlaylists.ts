import { setCallbackMap } from 'aspiration';
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
import { handleSelectItem, SelectionCbs } from 'skandha-facets/Selection';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { PlaylistsState, PropsT } from 'src/playlists/PlaylistsState';

export const initPlaylists = (state: PlaylistsState, props: PropsT) => {
  const ctr = state.playlistsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.addition, {
    add: {
      stageAdd() {
        ctr.addition.parentId = ctr.highlight.id || topOfTheList;
      },
      highlightNewItem() {
        ctr.selection.selectItem({ itemId: ctr.addition.item?.id });
        ctr.highlight.highlightItem(ctr.addition.item?.id);
        ctr.editing.enable();
      },
    },
    cancel: {
      unstageAdd() {
        ctr.editing.cancel();
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
        return props
          .savePlaylist(this.values)
          .then((localPlaylist: PlaylistT) => {
            ctr.addition.confirm();
            return localPlaylist;
          });
      },
    },
    cancel: {
      exit() {
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
      insertItems(playlists: PlaylistT[]) {
        props.savePlaylistOrdering(playlists);
      },
    },
  } as InsertionCbs);

  setCallbackMap(ctr.selection, {
    selectItem: {
      selectItem(this: SelectionCbs['selectItem']) {
        handleSelectItem(ctr.selection, this.selectionParams);
        // Note that highlight does not follow selection, because we want to
        // highlight with the arrow icon in the playlist list-item.
      },
    },
  } as SelectionCbs);
};
