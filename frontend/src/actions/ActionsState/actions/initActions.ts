import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { ActionsState, PropsT } from 'src/actions/ActionsState';

export const initActions = (state: ActionsState, props: PropsT) => {
  const ctr = state.actions;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));
};
