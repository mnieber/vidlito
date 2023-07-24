import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlayerControls.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {};

export const PlayerControls = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('PlayerControls', props.className)}>
        <Icon className="h-6 w-6" name="repeat" />
      </div>
    );
  }, DefaultProps)
);
