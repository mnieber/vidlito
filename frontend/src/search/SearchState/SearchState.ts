import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps } from 'skandha';
import { Highlight, Store } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { Settings } from './Settings';
import { initSearchResults } from './searchResults';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { Pagination } from '/src/playlists/PlaylistsState/facets/Pagination';
import { getIds } from '/src/utils/ids';

export type PropsT = {};

export class SearchState {
  props: PropsT;
  settings = new Settings();

  searchResultsCtr = {
    store: new Store<SearchResultT>(),
    highlight: new Highlight<SearchResultT>(),
    pagination: new Pagination(),
  };

  _searchResultsMapData(props: PropsT) {
    const ctr = this.searchResultsCtr;

    const getSearchResultById = (x: string | undefined) =>
      x ? ctr.store.itemById[x] : undefined;

    mapDataToProps(ctr, {
      highlight: {
        item: () => getSearchResultById(ctr.highlight.id),
        highlightableIds: () => getIds(ctr.store.items ?? []),
      },
    });
  }

  getSummary() {
    return {
      actions: Skandha.getCtrState(this.searchResultsCtr),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;

    registerCtr({
      ctr: this.searchResultsCtr,
      options: { name: 'SearchState.SearchResults' },
      initCtr: () => {
        initSearchResults(this, props);
        this._searchResultsMapData(props);
      },
    });
  }
}
