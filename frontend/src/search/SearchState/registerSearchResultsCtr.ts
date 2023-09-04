import { setCallbackMap } from 'aspiration';
import { registerCtr } from 'skandha-mobx';
import { getIds } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

import { mapDataToProps } from 'skandha';
import { resetPagination } from '/src/playlists/PlaylistsState/facets/Pagination';
import { SearchState } from '/src/search/SearchState';
import { SearchCbs } from '/src/search/SearchState/facets/Search';

const mapData = (state: SearchState) => {
  const ctr = state.searchResultsCtr;

  const getSearchResultById = (x: string | undefined) =>
    x ? ctr.store.itemById[x] : undefined;

  mapDataToProps(ctr, {
    store: {
      items: () => ctr.search.searchResults,
    },
    highlight: {
      item: () => getSearchResultById(ctr.highlight.id),
      highlightableIds: () => getIds(ctr.store.items ?? []),
    },
  });
};

const setCallbacks = (state: SearchState) => {
  const ctr = state.searchResultsCtr;
  setCallbackMap(ctr.search, {
    search: {
      search(this: SearchCbs['search']) {
        return state.props
          .searchContent({
            ...this.args,
            pagination: ctr.pagination,
          })
          .then((response: ObjT) => {
            resetPagination(ctr.pagination, response.pagination);
            return response;
          });
      },
    },
  } as SearchCbs);
};

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
