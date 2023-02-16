import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { colBanner, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './ActionsBar.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const ActionsBar = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ActionsBar', colBanner, props.className)}>
        Actions
        <div className={cn('ActionsBar__Filter', rowSkewer)}>Playlist All</div>
      </div>
    );
  }, DefaultProps)
);
