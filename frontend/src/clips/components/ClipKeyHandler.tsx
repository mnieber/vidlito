import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { withDefaultProps } from 'src/app/defaultProps';
import { createKeyDownHandler } from 'src/utils';
import { createVideoKeyHandlers } from 'src/videos/createVideoKeyHandlers';
import { VideoPlayerStateT } from 'src/videos/hooks/useVideoPlayerState';

export type PropsT = React.PropsWithChildren<{
  videoPlayerState: VideoPlayerStateT;
}>;

const DefaultProps = {};

export const ClipKeyHandler = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { clip } = props.videoPlayerState;

    const keyHandlers = {
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

    const handledKeys = R.keys(keyHandlers);
    const onKeyDown = createKeyDownHandler(keyHandlers);

    return (
      <KeyboardEventHandler handleKeys={handledKeys} onKeyEvent={onKeyDown}>
        {props.children}
      </KeyboardEventHandler>
    );
  }, DefaultProps)
);
