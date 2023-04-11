import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useHighlightUIConnector } from 'skandha-mobx/hooks';
import { ActionListViewItem } from 'src/actions/components/ActionListViewItem';
import { isLoading } from 'src/api/getState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Spinner } from 'src/frames/components';
import { Icon } from 'src/frames/components/Icon';
import { lvi } from 'src/frames/components/Lvi';
import { rowSkewer } from 'src/frames/components/Skewer';
import { cn } from 'src/utils/classnames';
import { useBuilder } from 'src/utils/hooks/useBuilder';
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
    const state = useBuilder<ActionListViewState>(
      () => new ActionListViewState()
    );
    const highlightUIConnector = useHighlightUIConnector(
      props.actionsHighlight,
      { itemSelector: '.ActionListViewItem' }
    );

    if (isLoading(props.actions)) {
      return <Spinner />;
    } else if (!props.actions?.length) return null;

    const noItems = <h2>There are no actions</h2>;

    const actionDivs: any[] = [];
    props.actions.forEach((action) => {
      const toggle = (
        <div
          key={`toggle-${action.id}`}
          className={cn('ActionListView_Toggle', rowSkewer)}
        >
          <Icon
            className={cn(lvi.leadingIcon)}
            name="cheveron-right"
            onClick={() => {
              state.setIsExpanded(action.id, !state.isExpanded[action.id]);
            }}
          />
        </div>
      );

      const name = (
        <div
          key={`label-${action.id}`}
          className={cn('ActionListView_PlaylistLabel', rowSkewer)}
        >
          {action.data.playlist_name}
        </div>
      );

      const item = (
        <ActionListViewItem
          key={`item-${action.id}`}
          action={action}
          isExpanded={state.isExpanded[action.id] ?? false}
          highlightUIProps={highlightUIConnector.handle(action.id)}
          onClick={() => {
            props.actionsState.undoAction(action);
          }}
        />
      );

      actionDivs.push(toggle);
      actionDivs.push(name);
      actionDivs.push(item);
    });

    return (
      <div
        className={cn(
          'ActionListView',
          'grid grid-cols-[50px,100px,1fr]',
          props.className
        )}
      >
        {actionDivs.length > 0 && actionDivs}
        {actionDivs.length === 0 && noItems}
      </div>
    );
  }, DefaultProps)
);

class ActionListViewState {
  @observable isExpanded: { [key: string]: boolean } = {};

  @action setIsExpanded(id: string, isExpanded: boolean) {
    this.isExpanded[id] = isExpanded;
  }

  constructor() {
    makeObservable(this);
  }
}
