import _debounce from 'lodash/debounce';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { VideoPlayer } from '/src/videos/components/VideoPlayer';
import { getVideoWidth, widthToHeight } from '/src/videos/utils/aspectRatio';

type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.videoPlayerState,
};

export const VideoPlayerPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = React.useState(false);
    const [panelWidth, setPanelWidth] = React.useState<number | undefined>(
      undefined
    );

    const handleResize = React.useMemo(
      () =>
        _debounce((width?: number) => {
          if (!R.isNil(width)) {
            setPanelWidth(width);
            setIsResizing(false);
          }
        }, 200),
      [setPanelWidth]
    );

    const ready = props.videoPlayerState.ready;
    const elm = ref.current;
    const width = getVideoWidth(
      props.videoPlayerState.isFullVideoWidth,
      panelWidth ?? elm?.getBoundingClientRect().width ?? 0
    );

    const height = widthToHeight(width);
    const placeholder = (
      <div
        className={cn(
          'VideoPlayerPanel__Placeholder',
          'bg-blue-300',
          //
          //
          L.row.skewer()
        )}
        style={{ height: ready ? 0 : height }}
      >
        <ReactResizeDetector
          handleWidth
          onResize={(width: number | undefined) => {
            setIsResizing(true);
            handleResize(width);
          }}
        />
        <div className={cn('mx-auto', { hidden: ready })}>
          <Icon className={cn(L.Lvi.icon())} name="play" />
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'VideoPlayerPanel',
          //
          //
          L.col.banner(),
          props.className
        )}
      >
        {placeholder}
        <div
          className={cn('VideoPlayerPanel__Body', { hidden: !ready })}
          style={{ height: height }}
        >
          <VideoPlayer
            key={props.videoPlayerState.url} // yes, we need this
            videoPlayerParentElm={
              props.dashboardState.video.videoPlayerParentElm
            }
            videoPlayerState={props.videoPlayerState}
            // The video image is slightly smaller than the container so
            // that the ResizeDetector can detect the resize towards a smaller image.
            width={width - 1}
            // During a resize we make the video image absolute so that it doesn't
            // affect the layout of the container. Without this trick, the container
            // cannot be made smaller than the video image.
            className={cn('', { absolute: isResizing })}
          />
        </div>
      </div>
    );
  }, DefaultProps)
);
