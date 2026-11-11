import React from 'react';
import { Highlight } from 'skandha-facets';
import { IPagination } from '/src/api/pagination/types';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { SearchFormT, SearchState } from '/src/search/SearchState/SearchState';
import { Search } from '/src/search/SearchState/facets/Search';

export const SearchContext = React.createContext<any>(null);

export const useSearchContext = () => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error(
      'useSearchContext must be used within a SearchContext.Provider'
    );
  }
  return context;
};

export const searchCtx = {
  search: [useSearchContext, 'search'] as any as Search<SearchFormT>,
  searchState: [useSearchContext, 'searchState'] as any as SearchState,
  searchResults: [useSearchContext, 'searchResults'] as any as SearchResultT[],
  searchResult: [useSearchContext, 'searchResult'] as any as SearchResultT,
  searchResultsHighlight: [
    useSearchContext,
    'searchResultsHighlight',
  ] as any as Highlight,
  searchResultsPagination: [
    useSearchContext,
    'searchResultsPagination',
  ] as any as IPagination,
};
