import { comparer, reaction } from 'mobx';
import { addCleanUpFunctionToCtr, mapDataToProps } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { ActionsState } from '/src/actions/ActionsState/ActionsState';
import { resetPagination } from '/src/playlists/PlaylistsState/facets/Pagination';
import { getIds } from '/src/utils/ids';

const mapData = (state: ActionsState) => {
  const ctr = state.actionsCtr;

  const getActionById = (x: string | undefined) =>
    x ? ctr.store.itemById[x] : undefined;

  mapDataToProps(ctr, {
    store: {
      items: () => state.props.getActions(),
    },
    highlight: {
      item: () => getActionById(ctr.highlight.id),
      highlightableIds: () => getIds(ctr.store.items ?? []),
    },
  });

  const cleanUp = reaction(
    () => ({ pagination: state.props.getActionsPagination() }),
    (inputs) => {
      resetPagination(ctr.pagination, inputs.pagination);
    },
    { fireImmediately: true, equals: comparer.structural }
  );
  addCleanUpFunctionToCtr(state, cleanUp);
};

const setCallbacks = (state: ActionsState) => {};

export const registerActionsCtr = (state: ActionsState) => {
  registerCtr({
    ctr: state.actionsCtr,
    options: { name: 'ActionsState.Actions' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
