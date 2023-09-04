import * as Skandha from 'skandha';
import { Highlight, Store } from 'skandha-facets';
import { SearchResultT } from '/src/api/types/SearchResultT';
import {
  IPagination,
  Pagination,
} from '/src/playlists/PlaylistsState/facets/Pagination';
import { Search } from '/src/search/SearchState/facets/Search';
import { TagsStore } from '/src/search/SearchState/facets/TagsStore';
import { registerSearchResultsCtr } from '/src/search/SearchState/registerSearchResultsCtr';

export type PropsT = {
  searchContent: (args: {
    playlistTerms: string;
    clipTerms: string;
    pagination: IPagination;
  }) => Promise<any>;
};

export class SearchState {
  props: PropsT;

  searchResultsCtr = {
    store: new Store<SearchResultT>(),
    highlight: new Highlight<SearchResultT>(),
    pagination: new Pagination(),
    search: new Search(),
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
