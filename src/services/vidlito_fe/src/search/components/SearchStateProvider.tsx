import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { updateSources } from 'mobx-resource-states';
import * as R from 'ramda';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { SearchContext } from '/src/search/hooks/useSearchContext';
import { useSearchState } from '/src/search/hooks/useSearchState';
import { createGetProps } from '/src/utils/createGetProps';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const ContextProps = {};

export const SearchStateProvider = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const { searchContent, searchState } = useSearchState({});

    const cache = useBuilder(() =>
      makeAutoObservable({
        get searchResults() {
          return updateSources(
            {
              resource: searchState.searchResultsCtr.store.items ?? [],
            },
            ['loading', () => isQueryLoading(searchContent), 'searchContent'],
            ['updating', () => isQueryUpdating(searchContent), 'searchContent']
          );
        },
        get searchResult() {
          return searchState.searchResultsCtr.highlight.item;
        },
      })
    );

    const getSearchContext = () => {
      return createGetProps(
        R.mergeAll([
          {
            searchState: () => searchState,
          },
          {
            searchResults: () => cache.searchResults,
            searchResult: () => cache.searchResult,
            searchResultsHighlight: () =>
              searchState.searchResultsCtr.highlight,
            searchResultsPagination: () =>
              searchState.searchResultsCtr.pagination,
            search: () => searchState.searchResultsCtr.search,
          },
        ])
      );
    };

    return (
      <SearchContext.Provider value={getSearchContext()}>
        {props.children}
      </SearchContext.Provider>
    );
  }, ContextProps)
);
