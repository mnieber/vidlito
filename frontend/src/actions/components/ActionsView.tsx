import { observer } from 'mobx-react-lite';
import { ActionListView } from 'src/actions/components/ActionListView';
import { ActionsBar } from 'src/actions/components/ActionsBar';
import { withDefaultProps } from 'src/app/defaultProps';
import { colBanner } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './ActionsView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const ActionsView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ActionsView', colBanner, props.className)}>
        <ActionsBar />
        <ActionListView />
      </div>
    );
  }, DefaultProps)
);
