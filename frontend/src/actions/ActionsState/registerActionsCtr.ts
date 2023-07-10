import { comparer, reaction } from 'mobx';
import { addCleanUpFunctionToCtr } from 'react-default-props-context';
import { mapDataToProps } from 'skandha';
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
      item: () => getActionById(ctr.highlight.id),
      highlightableIds: () => getIds(ctr.store.items ?? []),
    },
  });

  const cleanUp = reaction(
    () => ({ pagination: state.props.getActionsPagination() }),
    (inputs) => {
      ctr.pagination.reset(
        inputs.pagination?.nrOfItems ?? 0,
        inputs.pagination?.pageSize ?? 0
      );
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
