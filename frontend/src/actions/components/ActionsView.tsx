import { observer } from 'mobx-react-lite';
import { ActionsBar } from 'src/actions/components/ActionsBar';
import { ActionsListView } from 'src/actions/components/ActionsListView';
import { withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import './ActionsView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const ActionsView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ActionsView', props.className)}>
        <ActionsBar />
        <ActionsListView />
      </div>
    );
  }, DefaultProps)
);
