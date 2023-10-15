import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { Icon } from '/src/frames/components';
import { IconS } from '/src/frames/components/Icon';
import { cn } from '/src/utils/classnames';
import { videoPlayerCtx } from '/src/videos/hooks/useVideoPlayerContext';

// Import styles
import './PlayerControls.scss';

export type PropsT = {
  className?: any;
};

export const ContextProps = {
  videoPlayerState: videoPlayerCtx.videoPlayerState,
  clip: clipsCtx.clip,
};

export const PlayerControls = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
  }, ContextProps)
);
