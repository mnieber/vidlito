import { registerCtr } from 'skandha-mobx';
import { getIds } from '/src/utils/ids';

import { mapDataToProps } from 'skandha';
import { SearchState } from '/src/search/SearchState';

const setCallbacks = (state: SearchState) => {
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

const mapData = (state: SearchState) => {};

export const registerSearchResultsCtr = (state: SearchState) => {
  registerCtr({
    ctr: state.searchResultsCtr,
    options: { name: 'SearchState.SearchResults' },
    initCtr: () => {
      state.searchResultsCtr.pagination.reset(0, 60);
      setCallbacks(state);
      mapData(state);
    },
  });
};
