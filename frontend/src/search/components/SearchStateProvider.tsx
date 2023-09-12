import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { updateSources } from 'mobx-resource-states';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { withDefaultProps } from '/src/app/defaultProps';
import { useSearchState } from '/src/search/hooks/useSearchState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const SearchStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          searchState: () => searchState,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        searchResults: () => cache.searchResults,
        searchResult: () => cache.searchResult,
        searchResultsHighlight: () => searchState.searchResultsCtr.highlight,
        searchResultsPagination: () => searchState.searchResultsCtr.pagination,
        search: () => searchState.searchResultsCtr.search,
      };

      return result;
    };

    return (
      <DefaultPropsProvider extend value={getDefaultPropsContext()}>
        {props.children}
      </DefaultPropsProvider>
    );
  }, DefaultProps)
);
