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
    const { panelWidth, isResizing, onResize } = useResize();

    const ready = props.videoPlayerState.ready;
    const width = getVideoWidth(
      props.videoPlayerState.isFullVideoWidth,
      panelWidth ?? ref.current?.getBoundingClientRect().width ?? 0
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
        <VideoPlayerPanelPlaceholder
          onResize={onResize}
          width={width}
          hidden={ready}
        />
        <div
          className={cn('VideoPlayerPanel__Body', { hidden: !ready })}
          style={{ height: widthToHeight(width) }}
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

export const useResize = () => {
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

  return {
    isResizing,
    panelWidth,
    handleResize,
    onResize: (width: number | undefined) => {
      setIsResizing(true);
      handleResize(width);
    },
  };
};

export const VideoPlayerPanelPlaceholder = (props: {
  onResize: any;
  hidden: boolean;
  width: number;
}) => {
  const maxWidth = props.hidden ? {} : { maxWidth: props.width };
  const height = widthToHeight(props.width);

  return (
    <div
      className={cn(
        'VideoPlayerPanelPlaceholder',
        'bg-blue-300',
        //
        //
        L.row.skewer()
      )}
      style={{
        height: props.hidden ? 0 : height,
        ...maxWidth,
      }}
    >
      <ReactResizeDetector handleWidth onResize={props.onResize} />
      <div className={cn('mx-auto', { hidden: props.hidden })}>
        <Icon className={cn(L.Lvi.icon())} name="play" />
      </div>
    </div>
  );
};
