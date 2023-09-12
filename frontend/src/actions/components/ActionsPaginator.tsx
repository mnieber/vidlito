import { observer } from 'mobx-react-lite';
import { DefaultPropsProvider } from 'react-default-props-context';
import { getDisplayPage } from '/src/api/pagination/PaginationAdapter';
import { usePaginationAdapter } from '/src/api/pagination/hooks/usePaginationAdapter';
import { dps, withDefaultProps } from '/src/app/defaultProps';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.actions,
  ...dps.actionsPagination,
};

export const ActionsPaginator = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const displayPagination = usePaginationAdapter(props.actionsPagination, 1);
    const actions = getDisplayPage(
      props.actionsPagination,
      displayPagination,
      props.actions
    );

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
