import { type Cbs } from 'aspiration';
import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import {
  Deletion,
  DragAndDrop,
  Edit,
  Highlight,
  Selection,
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
import { ObjT } from '/src/utils/types';

const mapData = (state: PlaylistsState) => {
  const ctr = state.playlistsCtr;

  const getPlaylistById = (x: string | undefined) =>
    x ? ctr.display.itemById[x] : undefined;

  mapDataToProps(ctr, {
    store: {
      items: () => state.props.getPlaylists(),
    },
    selection: {
      selectableIds: () => getIds(ctr.display.items),
      items: () =>
        ctr.selection.itemIds
          .map(getPlaylistById)
          .filter((x?: PlaylistT) => !!x) as PlaylistT[],
    },
    highlight: {
      highlightableIds: () => getIds(ctr.display.items),
      item: () => getPlaylistById(ctr.highlight.itemId),
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
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  ctr.addition.callbackMap = {
    add: {
      stageAdd() {
        ctr.addition.parentId = ctr.highlight.itemId || topOfTheList;
      },
      highlightNewItem() {
        ctr.selection.selectItem({ itemId: ctr.addition.item?.id });
        ctr.highlight.set({ itemId: ctr.addition.item?.id });
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
        ctr.highlight.set({ itemId: itemId });
      },
    },
    confirm: {
      confirmAdd() {
        FacetPolicies.newItemsAreInsertedWhenConfirmed(ctr.addition);
      },
    },
  };

  ctr.deletion.callbackMap = {
    delete: {
      deleteItems(this: Cbs<Deletion['delete']>) {
        return state.props.deletePlaylists(this.args.itemIds);
      },
    },
  };

  ctr.dragAndDrop.callbackMap = {
    drop: {
      drop(this: Cbs<DragAndDrop['drop']>) {
        followedSelectedPlaylistsAreInsertedOnDrop(
          ctr.dragAndDrop,
          this.args.hoverPosition,
          state.props.getFollowedPlaylists()
        );
      },
    },
  };

  ctr.edit.callbackMap = {
    save: {
      saveItem(this: Cbs<Edit['save']>) {
        return state.props
          .savePlaylist(this.args.values)
          .then((response: ObjT) => {
            ctr.addition.confirm();
            return response;
          });
      },
    },
    cancel: {
      onCancel() {
        ctr.addition.cancel();
      },
    },
  };

  ctr.highlight.callbackMap = {
    set: {
      enter(this: Cbs<Highlight['set']>) {
        // Cancel adding a new item on highlight change
        if (ctr.addition.item && ctr.addition.item.id !== this.args.itemId) {
          ctr.addition.cancel();
        }
      },
    },
  };

  ctr.insertion.callbackMap = {
    insertItems: {
      insertItems(playlists: PlaylistT[]) {
        state.props.savePlaylistOrdering(playlists);
      },
    },
  };

  ctr.selection.callbackMap = {
    selectItem: {
      selectItem(this: Cbs<Selection['selectItem']>) {
        handleSelectItem(ctr.selection, this.args);
        // Note that highlight does not follow selection, because we want to
        // highlight with the arrow icon in the playlist list-item.
      },
    },
  };
};

export const registerPlaylistsCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.playlistsCtr,
    options: { name: 'PlaylistsState.Playlists' },
    initCtr: () => {
      mapData(state);
      setCallbacks(state);
    },
  });
};
