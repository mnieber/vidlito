import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { ActionsState } from '/src/actions/ActionsState/ActionsState';
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
      highlightableIds: () => getIds(ctr.store.items ?? []),
      item: () => getActionById(ctr.highlight.itemId),
    },
    pagination: {
      nrOfItems: () => state.props.getPagination()?.nrOfItems ?? 0,
      pageSize: () => state.props.getPagination()?.pageSize ?? 10,
      page: () => state.props.getPagination()?.page ?? 1,
    },
  });
};

export const registerActionsCtr = (state: ActionsState) => {
  registerCtr({
    ctr: state.actionsCtr,
    options: { name: 'ActionsState.Actions' },
    initCtr: () => {
      mapData(state);
      addCleanUpFunctionToCtr(state, () => cleanUpCtr(state.actionsCtr));
    },
  });
};
