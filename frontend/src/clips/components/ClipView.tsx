import { observer } from 'mobx-react-lite';
import { defaultProps as dps, withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import './ClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
};

export const ClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ClipView', props.className)}>Clip details here</div>
    );
  }, DefaultProps)
);
