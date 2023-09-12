import { observer } from 'mobx-react-lite';
import { DefaultPropsProvider } from 'react-default-props-context';
import { getDisplayPage } from '/src/api/pagination/PaginationAdapter';
import { usePaginationAdapter } from '/src/api/pagination/hooks/usePaginationAdapter';
import { dps, withDefaultProps } from '/src/app/defaultProps';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.searchResults,
  ...dps.searchResultsPagination,
};

export const SearchResultsPaginator = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
      <DefaultPropsProvider
        extend
        value={{
          defaultProps: {
            searchResults: () => searchResults,
            searchResultsPagination: () => displayPagination,
          },
        }}
      >
        {props.children}
      </DefaultPropsProvider>
    );
  }, DefaultProps)
);
