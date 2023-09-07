import { setCallbackMap } from 'aspiration';
import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { ActionsState } from '/src/actions/ActionsState/ActionsState';
import { UndoCbs } from '/src/actions/ActionsState/facets/Undo';
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
      item: () => getActionById(ctr.highlight.id),
    },
  });
};

const setCallbacks = (state: ActionsState) => {
  const ctr = state.actionsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.undo, {
    undo: {
      undo(this: UndoCbs['undo']) {
        return state.props.undoAction(this.args.action);
      },
    },
  } as UndoCbs);
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
