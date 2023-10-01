import { type Cbs } from 'aspiration';
import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { ActionsState } from '/src/actions/ActionsState/ActionsState';
import { Undo } from '/src/actions/ActionsState/facets/Undo';
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

const setCallbacks = (state: ActionsState) => {
  const ctr = state.actionsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  ctr.undo.callbackMap = {
    undo: {
      undo(this: Cbs<Undo['undo']>) {
        return state.props.undoAction(this.args.action);
      },
    },
  };
};

export const registerActionsCtr = (state: ActionsState) => {
  registerCtr({
    ctr: state.actionsCtr,
    options: { name: 'ActionsState.Actions' },
    initCtr: () => {
      mapData(state);
      setCallbacks(state);
    },
  });
};
