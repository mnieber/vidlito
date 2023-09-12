import { observer } from 'mobx-react-lite';
import { DefaultPropsProvider } from 'react-default-props-context';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  getPage,
  usePaginationAdapter,
} from '/src/playlists/PlaylistsState/facets/PaginationAdapter';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.actions,
  ...dps.actionsPagination,
};

export const ActionsPaginator = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const displayPagination = usePaginationAdapter(props.actionsPagination, 10);
    const actions = getPage(props.actions, displayPagination);

    return (
      <DefaultPropsProvider
        extend
        value={{
          defaultProps: {
            actions: () => actions,
            actionsPagination: () => displayPagination,
          },
        }}
      >
        {props.children}
      </DefaultPropsProvider>
    );
  }, DefaultProps)
);
