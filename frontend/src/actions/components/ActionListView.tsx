import { observer } from 'mobx-react-lite';
import { createHighlightUIConnector } from 'skandha-facets';
import { ActionListKeyHandler } from '/src/actions/components';
import { ActionListViewItem } from '/src/actions/components/ActionListViewItem';
import { NoActionsMatchTheFilter } from '/src/actions/components/NoActionsMatchTheFilter';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { L } from '/src/frames/layout';
import { isLoading } from '/src/resourceStates';
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
  ...dps.actionsPage,
};

export const ActionListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const highlightUIConnector = createHighlightUIConnector(
      props.actionsHighlight
    );

    //
    // 🔳  Handle loading state 🔳
    //
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

    //
    // 🔳 actionDivs 🔳
    //
    const actionDivs: any[] = props.actionsPage.map((action) => {
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
        {
          // 🔳 ActionListView 🔳
        }
        <div
          className={cn('ActionListView', [L.col.banner(), props.className])}
          tabIndex={0}
        >
          {actionDivs.length > 0 && actionDivs}
        </div>
      </ActionListKeyHandler>
    );
  }, DefaultProps)
);

export const ActionListViewLoader = (props: { className?: any }) => {
  //
  // 🔳 loaderBars 🔳
  //
  const loaderBars = ['1', '2', '3'].map((id: string) => {
    return <LoaderBar key={id} className={cn('h-6 my-4')} />;
  });

  return (
    /*
    🔳 ActionListViewLoader 🔳
    */
    <div
      className={cn('ActionListViewLoader', [L.col.banner(), props.className])}
    >
      {loaderBars}
    </div>
  );
};
