import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHighlightUIConnector } from 'skandha-mobx/hooks';
import { ActionsListViewItem } from 'src/actions/components/ActionsListViewItem';
import { isLoading } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Spinner } from 'src/frames/components';
import { Icon } from 'src/frames/components/Icon';
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
    const [state] = React.useState<ActionsListViewState>(
      () => new ActionsListViewState()
    );
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
      const toggle = (
        <Icon
          className="ActionsListView_Toggle"
          key={`icon-${action.id}`}
          name="arrow-right"
          onClick={() => {
            state.setIsExpanded(action.id, !state.isExpanded[action.id]);
          }}
        />
      );

      const name = (
        <div
          key={`label-${action.id}`}
          className="ActionsListView_PlaylistLabel"
        >
          {action.data.playlist_name}
        </div>
      );

      const item = (
        <ActionsListViewItem
          key={`item-${action.id}`}
          action={action}
          isExpanded={state.isExpanded[action.id] ?? false}
          highlightUIProps={highlightUIConnector.handle(action.id)}
        />
      );

      actionDivs.push(toggle);
      actionDivs.push(name);
      actionDivs.push(item);
    });

    return (
      <div
        className={cn(
          'ActionsListView',
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

class ActionsListViewState {
  @observable isExpanded: { [key: string]: boolean } = {};

  @action setIsExpanded(id: string, isExpanded: boolean) {
    this.isExpanded[id] = isExpanded;
  }

  constructor() {
    makeObservable(this);
  }
}
