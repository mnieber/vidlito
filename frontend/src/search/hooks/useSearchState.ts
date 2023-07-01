import React from 'react';
import { SearchState } from '/src/search/SearchState/SearchState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = {};

export const useSearchState = (props: PropsT) => {
  const searchState = useBuilder<SearchState>(() => {
    return new SearchState({});
  }) as SearchState;

  React.useEffect(() => () => searchState.destroy(), [searchState]);

  return {
    searchState,
  };
};
