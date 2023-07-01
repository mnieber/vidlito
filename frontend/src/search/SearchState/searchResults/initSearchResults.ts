import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { PropsT, SearchState } from '/src/search/SearchState';

export const initSearchResults = (state: SearchState, props: PropsT) => {
  const ctr = state.searchResultsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));
};
