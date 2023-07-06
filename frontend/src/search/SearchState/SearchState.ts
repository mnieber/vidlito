import { runInAction } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps } from 'skandha';
import { Highlight } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { initSearchResults } from './searchResults';
import { SearchContentArgsT } from '/src/api/mutations';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { Pagination } from '/src/playlists/PlaylistsState/facets/Pagination';
import { SearchResultsStore } from '/src/search/SearchState/facets/SearchResultsStore';
import { TagsStore } from '/src/search/SearchState/facets/TagsStore';
import { getIds } from '/src/utils/ids';

export type PropsT = {
  searchContent: (args: SearchContentArgsT) => Promise<SearchResultT[]>;
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

  searchContent(args: SearchContentArgsT) {
    return this.props.searchContent(args).then((results) => {
      runInAction(() => {
        this.searchResultsCtr.store.items = results;
      });
      return results;
    });
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
