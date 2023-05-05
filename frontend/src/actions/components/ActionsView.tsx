import { observer } from 'mobx-react-lite';
import { ActionListView } from 'src/actions/components/ActionListView';
import { ActionsBar } from 'src/actions/components/ActionsBar';
import { withDefaultProps } from 'src/app/defaultProps';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';

// Import styles
import './ActionsView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const ActionsView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ActionsView', L.col.banner(), props.className)}>
        <ActionsBar className="mb-4" />
        <ActionListView />
      </div>
    );
  }, DefaultProps)
);
