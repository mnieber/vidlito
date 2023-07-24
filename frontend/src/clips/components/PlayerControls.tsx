import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlayerControls.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.videoPlayerState,
  ...dps.clip,
};

export const PlayerControls = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('PlayerControls', props.className)}>
        <Icon
          className={cn('h-6 w-6', {
            'fill-teal-primary':
              props.videoPlayerState.videoController.isLoopEnabled,
            'fill-gray-darkest':
              !props.videoPlayerState.videoController.isLoopEnabled,
          })}
          name="repeat"
          onClick={() => {
            const isLoopEnabled =
              !props.videoPlayerState.videoController.isLoopEnabled;
            props.videoPlayerState.videoController.setLoop(
              isLoopEnabled,
              props.clip?.startTimeMs ?? 0,
              props.clip?.endTimeMs ?? Infinity
            );
          }}
        />
      </div>
    );
  }, DefaultProps)
);
