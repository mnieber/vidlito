import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import {
  ActionsContext,
  actionsCtx,
  useActionsContext,
} from '/src/actions/hooks/useActionsContext';
import { getDisplayPage } from '/src/api/pagination/PaginationAdapter';
import { usePaginationAdapter } from '/src/api/pagination/hooks/usePaginationAdapter';

export type PropsT = React.PropsWithChildren<{}>;

const ContextProps = {
  actions: actionsCtx.actions,
  actionsPagination: actionsCtx.actionsPagination,
};

export const ActionsPaginator = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const actionsContextObj = useActionsContext();

    const displayPagination = usePaginationAdapter(props.actionsPagination, 10);
    const actions = getDisplayPage(
      props.actionsPagination,
      displayPagination,
      props.actions
    );

    return (
      <ActionsContext.Provider
        value={{
          ...actionsContextObj,
          actions: actions,
          actionsPagination: displayPagination,
        }}
      >
        {props.children}
      </ActionsContext.Provider>
    );
  }, ContextProps)
);
