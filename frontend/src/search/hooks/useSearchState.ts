import React from 'react';
import { SearchContentArgsT } from '/src/api/mutations';
import { useSearchContent } from '/src/api/mutations/useSearchContent';
import { PropsT as SearchStatePropsT } from '/src/search/SearchState';
import { SearchState } from '/src/search/SearchState/SearchState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

type SearchContentArgs = Parameters<SearchStatePropsT['searchContent']>[0];

export type PropsT = {};

export const useSearchState = (props: PropsT) => {
  const searchContent = useSearchContent();

  const searchState = useBuilder<SearchState>(() => {
    return new SearchState({
      searchContent: (args: SearchContentArgs) => {
        return searchContent.mutateAsync({
          page: args.pagination.page,
          pageSize: args.pagination.pageSize,
          playlistTerms: args.playlistTerms,
          clipTerms: args.clipTerms,
        } as SearchContentArgsT);
      },
    });
  });

  React.useEffect(() => () => searchState.destroy(), [searchState]);

  return {
    searchState,
    searchContent,
  };
};
