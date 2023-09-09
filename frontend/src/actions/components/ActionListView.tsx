import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { HighlightUIConnector } from 'skandha-facets';
import { ActionListViewKeyHandler } from '/src/actions/components';
import { ActionListViewItem } from '/src/actions/components/ActionListViewItem';
import { NoActionsMatchTheFilter } from '/src/actions/components/NoActionsMatchTheFilter';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { LoaderBar } from '/src/frames/components/LoaderBar';
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
    //
    // 🔳  Handle loading state 🔳
    //
    if (isLoading(props.actions)) {
      return <ActionListViewLoader {...props} />;
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

    const highlightUIConnector = new HighlightUIConnector({
      highlight: props.actionsHighlight,
    });

    //
    // 🔳 actionDivs 🔳
    //
    const actionDivs = props.actions.map((action) => {
      return (
        <ActionListViewItem
          key={`item-${action.id}`}
          action={action}
          highlightUIProps={highlightUIConnector.handle(action.id)}
        />
      );
    });

    //
    // 🔳 ActionListView 🔳
    //
    return (
      <ActionListViewKeyHandler>
        <div
          className={cn('ActionListView', [L.col.banner(), props.className])}
          tabIndex={0}
        >
          {actionDivs.length > 0 && actionDivs}
        </div>
      </ActionListViewKeyHandler>
    );
  }, DefaultProps)
);

export const ActionListViewLoader = (props: { className?: any }) => {
  const loaderBars = ['1', '2', '3'].map((id: string) => {
    return <LoaderBar key={`item-${id}`} className={cn('h-6 my-4')} />;
  });

  return (
    <div
      className={cn('ActionListViewLoader', [L.col.banner(), props.className])}
    >
      {loaderBars}
    </div>
  );
};
