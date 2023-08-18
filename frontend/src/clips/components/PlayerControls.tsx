import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { IconS } from '/src/frames/components/Icon';
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
    const isLoopEnabled = () =>
      props.videoPlayerState.videoController.isLoopEnabled;

    return (
      <div className={cn('PlayerControls', props.className)}>
        <Icon
          className={cn(
            IconS.size.s24(),
            IconS.color[isLoopEnabled() ? 'teal' : 'grayDarkest']()
          )}
          name="repeat"
          onClick={() => {
            props.videoPlayerState.videoController.setLoop(
              !isLoopEnabled(),
              props.clip?.startTimeMs ?? 0,
              props.clip?.endTimeMs ?? Infinity
            );
          }}
        />
      </div>
    );
  }, DefaultProps)
);
