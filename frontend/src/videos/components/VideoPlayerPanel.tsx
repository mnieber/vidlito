import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import ReactResizeDetector from 'react-resize-detector';
import { dps } from 'src/api/dps';
import { VideoPlayer } from 'src/video/components/VideoPlayer';

type PropsT = {};

const DefaultProps = {
  ...dps.moveDisplay,
  ...dps.videoController,
};

export const VideoPlayerPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return props.videoController.video ? (
      <div className={'Move__video panel flexcol'}>
        <ReactResizeDetector
          handleWidth
          onResize={action((x: any) => {
            props.moveDisplay.videoPanelWidth = x;
          })}
        />
        <VideoPlayer
          videoController={props.videoController}
          videoWidth={props.moveDisplay.videoWidth ?? 0}
        />
      </div>
    ) : (
      <React.Fragment />
    );
  }, DefaultProps)
);
