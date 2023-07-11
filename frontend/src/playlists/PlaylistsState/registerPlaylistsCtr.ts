import { setCallbackMap } from 'aspiration';
import { mapDataToProps } from 'skandha';
import {
  AdditionCbs,
  DeletionCbs,
  DragAndDropCbs,
  EditCbs,
  HighlightCbs,
  InsertionCbs,
  SelectionCbs,
  handleSelectItem,
  topOfTheList,
} from 'skandha-facets';
import * as FacetPolicies from 'skandha-facets/policies';
import {
  DragSourceFromNewItem,
  createInsertionPreview,
} from 'skandha-facets/policies';
import { registerCtr } from 'skandha-mobx';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { followedSelectedPlaylistsAreInsertedOnDrop } from '/src/playlists/PlaylistsState/policies';
import { getIds } from '/src/utils/ids';

const mapData = (state: PlaylistsState) => {
  const ctr = state.playlistsCtr;

  const getPlaylistById = (x: string | undefined) =>
    x ? ctr.display.itemById[x] : undefined;

  mapDataToProps(ctr, {
    store: {
      items: () => state.props.getPlaylists(),
      followedPlaylists: () => state.props.getFollowedPlaylists(),
    },
    selection: {
      selectableIds: () => getIds(ctr.display.items),
      items: () => ctr.selection.ids.map(getPlaylistById as any),
    },
    highlight: {
      item: () => getPlaylistById(ctr.highlight.id),
    },
    insertion: {
      inputItems: () => ctr.store.items ?? [],
      preview: () =>
        createInsertionPreview(
          [DragSourceFromNewItem],
          ctr
        )(ctr.insertion.inputItems),
    },
    display: {
      items: () => ctr.insertion.preview,
    },
  });
};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.playlistsCtr;

  setCallbackMap(ctr.addition, {
    add: {
      stageAdd() {
        ctr.addition.parentId = ctr.highlight.id || topOfTheList;
      },
      highlightNewItem() {
        ctr.selection.selectItem({ itemId: ctr.addition.item?.id });
        ctr.highlight.highlightItem({ id: ctr.addition.item?.id });
        ctr.edit.enable();
      },
    },
    cancel: {
      unstageAdd(parentId: string | undefined) {
        ctr.edit.cancel();
        const itemId =
          (parentId === topOfTheList ? undefined : parentId) ??
          ctr.selection.selectableIds[0] ??
          ctr.store.items?.[0]?.id;
        ctr.selection.selectItem({ itemId: itemId });
        ctr.highlight.highlightItem({ id: itemId });
      },
    },
    confirm: {
      confirmAdd() {
        FacetPolicies.newItemsAreInsertedWhenConfirmed(ctr.addition);
      },
    },
  } as AdditionCbs<PlaylistT>);

  setCallbackMap(ctr.deletion, {
    delete: {
      deleteItems(this: DeletionCbs['delete']) {
        return state.props.deletePlaylists(this.args.itemIds);
      },
    },
  } as DeletionCbs);

  setCallbackMap(ctr.dragAndDrop, {
    drop: {
      drop(this: DragAndDropCbs['drop']) {
        followedSelectedPlaylistsAreInsertedOnDrop(
          ctr.dragAndDrop,
          this.args.hoverPosition,
          ctr.store.followedPlaylists
        );
      },
    },
  } as DragAndDropCbs);

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return state.props
          .savePlaylist(this.args.values)
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
        if (ctr.addition.item && ctr.addition.item.id !== this.args.id) {
          ctr.addition.cancel();
        }
      },
    },
  } as HighlightCbs);

  setCallbackMap(ctr.insertion, {
    insertItems: {
      insertItems(playlists: PlaylistT[]) {
        state.props.savePlaylistOrdering(playlists);
      },
    },
  } as InsertionCbs);

  setCallbackMap(ctr.selection, {
    selectItem: {
      selectItem(this: SelectionCbs['selectItem']) {
        handleSelectItem(ctr.selection, this.args);
        // Note that highlight does not follow selection, because we want to
        // highlight with the arrow icon in the playlist list-item.
      },
    },
  } as SelectionCbs);
};

export const registerPlaylistsCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.playlistsCtr,
    options: { name: 'PlaylistsState.Playlists' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
