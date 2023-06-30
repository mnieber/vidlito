import { observer } from 'mobx-react-lite';
import { createHighlightUIConnector } from 'skandha-facets';
import { ActionListKeyHandler } from '/src/actions/components';
import { ActionListViewItem } from '/src/actions/components/ActionListViewItem';
import { NoActionsMatchTheFilter } from '/src/actions/components/NoActionsMatchTheFilter';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './ActionListView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.actions,
  ...dps.actionsHighlight,
  ...dps.actionsState,
};

export const ActionListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const highlightUIConnector = createHighlightUIConnector(
      props.actionsHighlight
    );

    if (isLoading(props.actions)) {
      return <ActionListViewLoader />;
    } else if (!props.actions?.length)
      return (
        <NoActionsMatchTheFilter
          msg={
            props.actionsState.settings.showAllActions
              ? 'There currently are no actions'
              : 'There are no actions for the current playlist'
          }
        />
      );

    const actionDivs: any[] = props.actions.map((action) => {
      return (
        <ActionListViewItem
          key={`item-${action.id}`}
          action={action}
          highlightUIProps={highlightUIConnector.handle(action.id)}
        />
      );
    });

    return (
      <ActionListKeyHandler>
        <div
          className={cn(
            'ActionListView',
            //
            //
            L.col.banner(),
            props.className
          )}
          tabIndex={0}
        >
          {actionDivs.length > 0 && actionDivs}
        </div>
      </ActionListKeyHandler>
    );
  }, DefaultProps)
);

export const ActionListViewLoader = (props: { className?: any }) => {
  const l = L.Lvi;
  const divs = ['1', '2', '3'].map((id: string) => {
    return (
      <div
        key={id}
        className={cn(
          'ActionListViewLoader__Item',
          l.root(),
          'h-4 my-4',
          'rounded bg-gray-300'
        )}
      />
    );
  });

  return (
    <div
      className={cn(
        'ActionListViewLoader',
        //
        //
        L.col.banner(),
        props.className
      )}
    >
      {divs}
    </div>
  );
};
