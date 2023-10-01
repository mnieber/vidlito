import { type Cbs } from 'aspiration';
import { registerCtr } from 'skandha-mobx';
import { getIds } from '/src/utils/ids';

import { mapDataToProps } from 'skandha';
import { SearchState } from '/src/search/SearchState';
import { SearchFormT } from '/src/search/SearchState/SearchState';
import { Search } from '/src/search/SearchState/facets/Search';

const mapData = (state: SearchState) => {
  const ctr = state.searchResultsCtr;

  const getSearchResultById = (x: string | undefined) =>
    x ? ctr.store.itemById[x] : undefined;

  mapDataToProps(ctr, {
    store: {
      items: () => state.props.getSearchResults(),
    },
    highlight: {
      item: () => getSearchResultById(ctr.highlight.itemId),
      highlightableIds: () => getIds(ctr.store.items ?? []),
    },
    pagination: {
      nrOfItems: () => state.props.getPagination()?.nrOfItems ?? 0,
      pageSize: () => state.props.getPagination()?.pageSize ?? 10,
      page: () => state.props.getPagination()?.page ?? 1,
    },
  });
};

const setCallbacks = (state: SearchState) => {
  const ctr = state.searchResultsCtr;
  ctr.search.callbackMap = {
    search: {
      search(this: Cbs<Search<SearchFormT>['search']>) {
        ctr.search.form = {
          playlistTerms: this.args.playlistTerms,
          clipTerms: this.args.clipTerms,
        };
      },
    },
  };
};

export const registerSearchResultsCtr = (state: SearchState) => {
  registerCtr({
    ctr: state.searchResultsCtr,
    options: { name: 'SearchState.SearchResults' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
