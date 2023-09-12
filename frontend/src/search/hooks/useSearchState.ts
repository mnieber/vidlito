import React from 'react';
import { useSearchContent } from '/src/api/endpoints/queries/useSearchContent';
import { useObservableQuery } from '/src/api/hooks';
import { SearchState } from '/src/search/SearchState/SearchState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = {};

export const useSearchState = (props: PropsT) => {
  const searchStateRef = React.useRef<SearchState | undefined>();

  // Queries
  const searchResultsCtr = searchStateRef.current?.searchResultsCtr;
  const args = {
    playlistTerms: searchResultsCtr?.search.form?.playlistTerms,
    clipTerms: searchResultsCtr?.search.form?.clipTerms,
    pageSize: searchResultsCtr?.pagination.pageSize ?? 10,
  };
  const options = {
    fetchAsLoad: false,
    debugLabel: 'searchContent',
  };

  // Get existing search results (from the cache if possible)
  const searchContent = useObservableQuery(
    useSearchContent(
      { ...args, page: searchResultsCtr?.pagination.page ?? 1 },
      { enabled: !!searchResultsCtr?.search.form }
    ),
    options
  );

  // Get next search results (from the cache if possible)
  const searchNextContent = useObservableQuery(
    useSearchContent(
      { ...args, page: searchResultsCtr?.pagination.requestedPage ?? 1 },
      { enabled: !!searchResultsCtr?.search.form }
    ),
    options
  );

  const searchState = (searchStateRef.current = useBuilder<SearchState>(() => {
    return new SearchState({
      getSearchResults: () => {
        const data = searchNextContent.data ?? searchContent.data;
        return data?.searchResults;
      },
      getPagination: () => {
        const data = searchNextContent.data ?? searchContent.data;
        return data?.pagination;
      },
    });
  })) as SearchState;

  React.useEffect(() => () => searchState.destroy(), [searchState]);

  return {
    searchState,
    searchContent,
  };
};
