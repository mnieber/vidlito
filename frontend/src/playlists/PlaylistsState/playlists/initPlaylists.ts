import { setCallbackMap } from 'aspiration';
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
  SelectionCbs,
  handleSelectItem,
  topOfTheList,
} from 'skandha-facets';
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
        ctr.edit.enable();
      },
    },
    cancel: {
      unstageAdd() {
        ctr.edit.cancel();
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

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return props
          .savePlaylist(this.values)
          .then((localPlaylist: PlaylistT) => {
            ctr.addition.confirm();
            return localPlaylist;
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
