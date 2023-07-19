import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { LviL } from '/src/frames/components/Lvi';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { VideoPlayer } from '/src/videos/components/VideoPlayer';
import { widthToHeight } from '/src/videos/utils/aspectRatio';

type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.videoPlayerState,
};

export const VideoPlayerPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const ready = props.videoPlayerState.ready;
    const width = props.dashboardState.panelWidth;

    if (R.isNil(width)) return null;

    return (
      <div
        className={cn(
          'VideoPlayerPanel',
          [],
          [L.col.banner(), props.className]
        )}
      >
        <VideoPlayerPanelPlaceholder width={width} hidden={ready} />
        <VideoPlayer
          key={props.videoPlayerState.url} // yes, we need this
          videoPlayerParentElm={props.dashboardState.video.videoPlayerParentElm}
          videoPlayerState={props.videoPlayerState}
          width={width}
          className={cn('', {
            hidden: !ready,
          })}
        />
      </div>
    );
  }, DefaultProps)
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
        [],
        [L.row.skewer()]
      )}
      style={{
        height: props.hidden ? 0 : height,
        ...maxWidth,
      }}
    >
      {!props.hidden && (
        <div className={cn('mx-auto')}>
          <Icon className={cn(LviL.icon.root())} name="play" />
        </div>
      )}
    </div>
  );
};
