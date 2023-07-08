import { mapDataToProps } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { getIds } from '/src/utils/ids';

import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { PropsT, SearchState } from '/src/search/SearchState';

const setCallbacks = (state: SearchState, props: PropsT) => {
  const ctr = state.searchResultsCtr;

  const getSearchResultById = (x: string | undefined) =>
    x ? ctr.store.itemById[x] : undefined;

  mapDataToProps(ctr, {
    highlight: {
      item: () => getSearchResultById(ctr.highlight.id),
      highlightableIds: () => getIds(ctr.store.items ?? []),
    },
  });
};

const mapData = (state: SearchState, props: PropsT) => {
  const ctr = state.searchResultsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));
};

export const registerSearchResultsCtr = (state: SearchState, props: PropsT) => {
  registerCtr({
    ctr: state.searchResultsCtr,
    options: { name: 'SearchState.SearchResults' },
    initCtr: () => {
      setCallbacks(state, props);
      mapData(state, props);
    },
  });
};
