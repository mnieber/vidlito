import { addCleanUpFunctionToCtr, cleanUpCtr } from 'skandha';
import { ActionsState, PropsT } from '/src/actions/ActionsState';

export const initActions = (state: ActionsState, props: PropsT) => {
  const ctr = state.actionsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));
};
