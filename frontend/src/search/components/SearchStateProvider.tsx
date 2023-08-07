import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { isUpdating } from '/src/api/getState';
import { withDefaultProps } from '/src/app/defaultProps';
import {
  getDisplayPage,
  PaginationAdapter,
} from '/src/playlists/PlaylistsState/facets/PaginationAdapter';
import { updateSources } from '/src/resourceStates';
import { shareRS } from '/src/resourceStates/ResourceState';
import { useSearchState } from '/src/search/hooks/useSearchState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const SearchStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { searchContent, searchState } = useSearchState({});

    // The display pagination adapts the default pagination
    const displayPagination = useBuilder(() => {
      return new PaginationAdapter(searchState.searchResultsCtr.pagination, 4);
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get searchResults() {
          return updateSources(
            {
              resource: searchState.searchResultsCtr.store.items ?? [],
            },
            ['updating', () => isUpdating(searchContent), 'searchContent']
          );
        },
        get searchResult() {
          return searchState.searchResultsCtr.highlight.item;
        },
        get searchResultsPage() {
          const items = getDisplayPage(
            searchState.searchResultsCtr.pagination,
            displayPagination,
            cache.searchResults
          );
          shareRS(cache.searchResults, items);
          return items;
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
        searchResultsPage: () => cache.searchResultsPage,
        searchResult: () => cache.searchResult,
        searchResultsHighlight: () => searchState.searchResultsCtr.highlight,
        searchResultsPagination: () => displayPagination,
        searchForm: () => searchState.searchResultsCtr.store.form,
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
