import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { getDisplayPage } from '/src/api/pagination/PaginationAdapter';
import { usePaginationAdapter } from '/src/api/pagination/hooks/usePaginationAdapter';
import {
  SearchContext,
  searchCtx,
  useSearchContext,
} from '/src/search/hooks/useSearchContext';

export type PropsT = React.PropsWithChildren<{}>;

const ContextProps = {
  searchResults: searchCtx.searchResults,
  searchResultsPagination: searchCtx.searchResultsPagination,
};

export const SearchResultsPaginator = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const searchContextObj = useSearchContext();
    const displayPagination = usePaginationAdapter(
      props.searchResultsPagination,
      10
    );
    const searchResults = getDisplayPage(
      props.searchResultsPagination,
      displayPagination,
      props.searchResults
    );

    return (
      <SearchContext.Provider
        value={{
          ...searchContextObj,
          searchResults: searchResults,
          searchResultsPagination: displayPagination,
        }}
      >
        {props.children}
      </SearchContext.Provider>
    );
  }, ContextProps)
);
