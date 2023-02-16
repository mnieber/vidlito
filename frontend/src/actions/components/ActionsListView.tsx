import { observer } from 'mobx-react-lite';
import {} from 'skandha-mobx/hooks';
import { ActionsListViewItem } from 'src/actions/components/ActionsListViewItem';
import { isLoading } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import UIkit from 'src/frames/styles/uikit';
import { cn } from 'src/utils/classnames';
import './ActionsListView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.actions,
};

export const ActionsListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.actions)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.actions?.length) return null;

    const noItems = <h2>There are no actions</h2>;

    const actionDivs = props.actions.map((action) => {
      return <ActionsListViewItem key={action.id} action={action} />;
    });

    return (
      <div className={cn('ActionsListView', props.className)}>
        {actionDivs.length > 0 && actionDivs}
        {actionDivs.length === 0 && noItems}
      </div>
    );
  }, DefaultProps)
);
