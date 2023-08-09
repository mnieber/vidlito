import React from 'react';
import { SearchContentArgsT } from '/src/api/mutations';
import { useSearchContent } from '/src/api/mutations/useSearchContent';
import { SearchState } from '/src/search/SearchState/SearchState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = {};

export const useSearchState = (props: PropsT) => {
  const searchContent = useSearchContent();

  const searchState = useBuilder<SearchState>(() => {
    return new SearchState({
      searchContent: (args: SearchContentArgsT) => {
        return searchContent.mutateAsync(args);
      },
    });
  });

  React.useEffect(() => () => searchState.destroy(), [searchState]);

  return {
    searchState,
    searchContent,
  };
};
