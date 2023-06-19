import { observer } from 'mobx-react-lite';
import { createHighlightUIConnector } from 'skandha-facets';
import { ActionListViewItem } from '/src/actions/components/ActionListViewItem';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Spinner } from '/src/frames/components';
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
      return <Spinner />;
    } else if (!props.actions?.length) return null;

    const noItems = <h2>There are no actions</h2>;

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
      <div
        className={cn(
          'ActionListView',
          //
          //
          L.col.banner(),
          props.className
        )}
      >
        {actionDivs.length > 0 && actionDivs}
        {actionDivs.length === 0 && noItems}
      </div>
    );
  }, DefaultProps)
);
