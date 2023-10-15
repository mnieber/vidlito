import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { withContextProps } from 'react-props-from-context';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { VideoPlayer } from '/src/videos/components/VideoPlayer';
import { videoPlayerCtx } from '/src/videos/hooks/useVideoPlayerContext';
import { widthToHeight } from '/src/videos/utils/aspectRatio';

type PropsT = {
  className?: any;
};

const ContextProps = {
  dashboardState: dashboardCtx.dashboardState,
  videoPlayerState: videoPlayerCtx.videoPlayerState,
};

export const VideoPlayerPanel = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const ready = props.videoPlayerState.ready;
    const width = props.dashboardState.panelState.panelWidth;
    const isResizing = props.dashboardState.panelState.isResizing;

    if (R.isNil(width)) return null;

    return (
      <div
        className={cn('VideoPlayerPanel', [L.col.banner(), props.className])}
      >
        <VideoPlayerPanelPlaceholder
          width={width}
          hidden={!isResizing && ready}
        />
        <VideoPlayer
          key={props.videoPlayerState.url} // yes, we need this
          videoPlayerState={props.videoPlayerState}
          width={width}
          className={cn({
            hidden: isResizing || !ready,
          })}
        />
      </div>
    );
  }, ContextProps)
);

export const VideoPlayerPanelPlaceholder = (props: {
  hidden: boolean;
  width: number;
}) => {
  const maxWidth = props.hidden ? {} : { maxWidth: props.width };
  const height = widthToHeight(props.width);

  return (
    <div
      className={cn(
        'VideoPlayerPanelPlaceholder',
        { 'bg-blue-300': !props.hidden },
        [L.row.skewer()]
      )}
      style={{
        height: props.hidden ? 0 : height,
        ...maxWidth,
      }}
    >
      {!props.hidden && (
        <div className={cn('mx-auto')}>
          <Icon
            className={cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]')}
            name="play"
          />
        </div>
      )}
    </div>
  );
};
