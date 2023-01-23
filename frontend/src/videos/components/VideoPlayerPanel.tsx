import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import ReactResizeDetector from 'react-resize-detector';
import { withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import { VideoPlayer } from 'src/videos/components/VideoPlayer';
import { VideoPlayerStateT } from 'src/videos/hooks/useVideoPlayerState';

type PropsT = {
  videoPlayerState: VideoPlayerStateT;
};

const DefaultProps = {};

export const VideoPlayerPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!props.videoPlayerState.clip) return null;

    return (
      <div className={cn('VideoPlayerPanel')}>
        <ReactResizeDetector
          handleWidth
          onResize={action((x: any) => {
            props.videoPlayerState.setPanelWidth(x);
          })}
        />
        <VideoPlayer videoPlayerState={props.videoPlayerState} />
      </div>
    );
  }, DefaultProps)
);
