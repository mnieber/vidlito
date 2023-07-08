import React from 'react';
import { SearchContentArgsT } from '/src/api/mutations';
import { useSearchContent } from '/src/api/mutations/useSearchContent';
import { initRS } from '/src/resourceStates';
import { trackPromise } from '/src/resourceStates/trackPromise';
import { SearchState } from '/src/search/SearchState/SearchState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = {};

export const useSearchState = (props: PropsT) => {
  const searchContent = initRS(useSearchContent());

  const searchState = useBuilder<SearchState>(() => {
    return new SearchState({
      searchContent: (args: SearchContentArgsT) => {
        return trackPromise({
          name: 'searchContent',
          states: { updating: [searchContent] },
          promise: searchContent.mutateAsync(args),
        }).result;
      },
    });
  });

  React.useEffect(() => () => searchState.destroy(), [searchState]);

  return {
    searchState,
    searchContent,
  };
};
