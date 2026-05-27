import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import {
  DragSourceFromNewItem,
  createInsertionPreview,
} from 'skandha-facets/policies';
import { registerCtr } from 'skandha-mobx';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { getIds } from '/src/utils/ids';

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
