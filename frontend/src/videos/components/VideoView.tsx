import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import './VideoView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
};

export const VideoView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('VideoView', props.className)}>
        <div className={cn('VideoView__Body')}></div>
      </div>
    );
  }, DefaultProps)
);
