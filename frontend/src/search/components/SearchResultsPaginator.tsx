import { observer } from 'mobx-react-lite';
import { DefaultPropsProvider } from 'react-default-props-context';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  getPage,
  usePaginationAdapter,
} from '/src/playlists/PlaylistsState/facets/PaginationAdapter';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.searchResults,
  ...dps.searchResultsPagination,
};

export const SearchResultsPaginator = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const displayPagination = usePaginationAdapter(
      props.searchResultsPagination,
      4
    );
    const searchResults = getPage(props.searchResults, displayPagination);

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
