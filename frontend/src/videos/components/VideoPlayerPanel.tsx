import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import { VideoPlayer } from 'src/videos/components/VideoPlayer';
import { VideoPlayerState } from 'src/videos/hooks/useVideoPlayerState';
import { widthToHeight } from 'src/videos/utils/aspectRatio';

type PropsT = {
  videoPlayerState: VideoPlayerState;
};

const DefaultProps = {};

export const VideoPlayerPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const handleResize = React.useMemo(
      () => (width?: number) => {
        if (!R.isNil(width)) {
          props.videoPlayerState.setPanelWidth(width);
        }
      },
      [props.videoPlayerState]
    );

    const ready = props.videoPlayerState.ready;
    const width = props.videoPlayerState.videoWidth;
    const height = widthToHeight(props.videoPlayerState.videoWidth);
    const placeholder = (
      <div
        className={cn('VideoPlayerPanel__Placeholder', 'bg-blue-200')}
        style={{ width: width, height: height }}
      >
        Placeholder
      </div>
    );

    return (
      <div className={cn('VideoPlayerPanel')}>
        <ReactResizeDetector handleWidth onResize={handleResize} />
        {!ready && placeholder}
        <div className={cn({ hidden: !ready })}>
          <VideoPlayer videoPlayerState={props.videoPlayerState} />
        </div>
      </div>
    );
  }, DefaultProps)
);
