import * as Skandha from 'skandha';
import { Highlight, Store } from 'skandha-facets';
import { SearchResultT } from '/src/api/types/SearchResultT';

// Local imports
import { Search } from './facets/Search';
import { TagsStore } from './facets/TagsStore';
import { registerSearchResultsCtr } from './registerSearchResultsCtr';
import { Pagination } from '/src/api/facets/Pagination';
import { PaginationT } from '/src/api/pagination/types';

export type SearchFormT = {
  playlistTerms: string;
  clipTerms: string;
};

export type PropsT = {
  getSearchResults: () => SearchResultT[];
  getPagination: () => PaginationT;
};

export class SearchState {
  props: PropsT;

  searchResultsCtr = {
    highlight: new Highlight<SearchResultT>(),
    pagination: new Pagination(),
    search: new Search<SearchFormT>(),
    store: new Store<SearchResultT>(),
  };

  tagsCtr = {
    store: new TagsStore(),
  };

  getSummary() {
    return {
      actions: Skandha.getCtrState(this.searchResultsCtr),
    };
  }

  destroy() {
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;
    registerSearchResultsCtr(this);
  }
}
