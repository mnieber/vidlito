import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import * as React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { createKeyDownHandler } from 'src/utils';
import { createVideoKeyHandlers } from 'src/videos/createVideoKeyHandlers';
import { VideoPlayerStateT } from 'src/videos/hooks/useVideoPlayerState';

type PropsT = React.PropsWithChildren<{
  videoPlayerState: VideoPlayerStateT;
}>;

const DefaultProps = {};

export const ClipKeyHandler = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { clip } = props.videoPlayerState;

    const moveKeyHandlers = {
      'ctrl+shift+space': () =>
        runInAction(() => {
          props.videoPlayerState.setIsFullVideoWidth(
            !props.videoPlayerState.isFullVideoWidth
          );
        }),

      ...createVideoKeyHandlers(
        props.videoPlayerState.videoController,
        clip.startTimeMs ? clip.startTimeMs / 1000 : undefined,
        clip.endTimeMs ? clip.endTimeMs / 1000 : undefined
      ),
    };

    const videoKeys = R.keys(moveKeyHandlers);
    const onKeyDown = createKeyDownHandler(moveKeyHandlers);

    return (
      <KeyboardEventHandler handleKeys={videoKeys} onKeyEvent={onKeyDown}>
        {props.children}
      </KeyboardEventHandler>
    );
  }, DefaultProps)
);
