import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import ReactResizeDetector from 'react-resize-detector';
import { withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import { VideoPlayer } from 'src/videos/components/VideoPlayer';
import { VideoPlayerStateT } from 'src/videos/hooks/useVideoPlayerState';
import { widthToHeight } from 'src/videos/utils/aspectRatio';

type PropsT = {
  videoPlayerState: VideoPlayerStateT;
};

const DefaultProps = {};

export const VideoPlayerPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const ready = props.videoPlayerState.videoController.ready;
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
        <ReactResizeDetector
          handleWidth
          onResize={action((x: any) => {
            props.videoPlayerState.setPanelWidth(x);
          })}
        />
        {!ready && placeholder}
        <div className={cn({ hidden: !ready })}>
          <VideoPlayer videoPlayerState={props.videoPlayerState} />
        </div>
      </div>
    );
  }, DefaultProps)
);
