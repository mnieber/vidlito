import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import ReactResizeDetector from 'react-resize-detector';
import { VideoPlayer } from 'src/videos/components/VideoPlayer';
import { VideoPlayerStateT } from 'src/videos/hooks/useVideoPlayerState';

type PropsT = {
  videoPlayerState: VideoPlayerStateT;
};

const DefaultProps = {};

export const VideoPlayerPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return props.videoPlayerState.clip ? (
      <div className={'VideoPlayerPanel flex flex-col'}>
        <ReactResizeDetector
          handleWidth
          onResize={action((x: any) => {
            debugger;
            props.videoPlayerState.setPanelWidth(x);
          })}
        />
        <VideoPlayer videoPlayerState={props.videoPlayerState} />
      </div>
    ) : (
      <React.Fragment />
    );
  }, DefaultProps)
);
