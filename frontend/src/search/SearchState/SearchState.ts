import { runInAction } from 'mobx';
import * as Skandha from 'skandha';
import { Highlight } from 'skandha-facets';
import { SearchContentArgsT } from '/src/api/mutations';
import { SearchResultT } from '/src/api/types/SearchResultT';
import {
  Pagination,
  resetPagination,
} from '/src/playlists/PlaylistsState/facets/Pagination';
import { SearchResultsStore } from '/src/search/SearchState/facets/SearchResultsStore';
import { TagsStore } from '/src/search/SearchState/facets/TagsStore';
import { registerSearchResultsCtr } from '/src/search/SearchState/registerSearchResultsCtr';

export type PropsT = {
  searchContent: (args: SearchContentArgsT) => Promise<any>;
};

export class SearchState {
  props: PropsT;

  searchResultsCtr = {
    store: new SearchResultsStore(),
    highlight: new Highlight<SearchResultT>(),
    pagination: new Pagination(),
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

  searchContent(args: Omit<SearchContentArgsT, 'page' | 'pageSize'>) {
    const pagination = this.searchResultsCtr.pagination;
    const form = {
      ...args,
      page: pagination.page,
      pageSize: pagination.pageSize,
    };

    return this.props.searchContent(form).then((results) => {
      runInAction(() => {
        this.searchResultsCtr.store.items = results.searchResults;
        this.searchResultsCtr.store.form = form;
        resetPagination(pagination, results.pagination);
      });
      return results;
    });
  }

  constructor(props: PropsT) {
    this.props = props;
    registerSearchResultsCtr(this);
  }
}
