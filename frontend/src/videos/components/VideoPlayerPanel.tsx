import _debounce from 'lodash/debounce';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import { VideoPlayer } from 'src/videos/components/VideoPlayer';
import { VideoPlayerState } from 'src/videos/hooks/useVideoPlayerState';
import { getVideoWidth, widthToHeight } from 'src/videos/utils/aspectRatio';

type PropsT = {
  videoPlayerState: VideoPlayerState;
};

const DefaultProps = {};

export const VideoPlayerPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const [panelWidth, setPanelWidth] = React.useState<number | undefined>(
      undefined
    );

    const handleResize = React.useMemo(
      () =>
        _debounce((width?: number) => {
          if (!R.isNil(width)) {
            setPanelWidth(width);
          }
        }, 200),
      [setPanelWidth]
    );

    const ready = props.videoPlayerState.ready;
    const width = getVideoWidth(
      props.videoPlayerState.isFullVideoWidth,
      panelWidth ?? 100
    );

    const height = widthToHeight(width);
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
        <div className={cn({ hidden: !ready })} style={{ height: height }}>
          <VideoPlayer
            videoPlayerState={props.videoPlayerState}
            width={width}
          />
        </div>
      </div>
    );
  }, DefaultProps)
);
