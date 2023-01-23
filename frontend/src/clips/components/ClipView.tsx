import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipKeyHandler } from 'src/clips/components/ClipKeyHandler';
import { cn } from 'src/utils/classnames';
import { VideoPlayerPanel } from 'src/videos/components/VideoPlayerPanel';
import { useVideoPlayerState } from 'src/videos/hooks';
import './ClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
};

export const ClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const parentElmRef = React.useRef<HTMLDivElement>(null);
    const videoPlayerState = useVideoPlayerState({
      clip: props.clip,
      parentElmRef,
    });

    return (
      <ClipKeyHandler videoPlayerState={videoPlayerState}>
        <div
          ref={parentElmRef}
          className={cn('ClipView', props.className)}
          tabIndex={123}
        >
          <div className={cn('ClipView__Title')}>{props.clip.name}</div>
          <VideoPlayerPanel videoPlayerState={videoPlayerState} />
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
