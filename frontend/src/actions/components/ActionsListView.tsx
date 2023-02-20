import { observer } from 'mobx-react-lite';
import { useHighlightUIConnector } from 'skandha-mobx/hooks';
import { ActionsListViewItem } from 'src/actions/components/ActionsListViewItem';
import { isLoading } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Spinner } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './ActionsListView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.actions,
  ...dps.actionsHighlight,
};

export const ActionsListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const highlightUIConnector = useHighlightUIConnector(
      props.actionsHighlight,
      {
        itemSelector: '.ActionListViewItem',
      },
      []
    );

    if (isLoading(props.actions)) {
      return <Spinner />;
    } else if (!props.actions?.length) return null;

    const noItems = <h2>There are no actions</h2>;

    const actionDivs: any[] = [];
    props.actions.forEach((action) => {
      actionDivs.push(
        <div
          key={`label-${action.id}`}
          className="ActionsListView_PlaylistLabel"
        >
          {action.data.playlist_name}
        </div>
      );
      actionDivs.push(
        <ActionsListViewItem
          key={`action-${action.id}`}
          action={action}
          highlightUIProps={highlightUIConnector.handle(action.id)}
        />
      );
    });

    return (
      <div
        className={cn(
          'ActionsListView',
          'grid grid-cols-[100px,1fr]',
          props.className
        )}
      >
        {actionDivs.length > 0 && actionDivs}
        {actionDivs.length === 0 && noItems}
      </div>
    );
  }, DefaultProps)
);
