import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { ClipT } from 'src/api/types/ClipT';
import { createKeyDownHandler } from 'src/utils';
import { createVideoKeyHandlers } from 'src/videos/createVideoKeyHandlers';
import { VideoPlayerState } from 'src/videos/VideoPlayerState';

export type PropsT = React.PropsWithChildren<{
  videoPlayerState: VideoPlayerState;
  clip: ClipT;
}>;

export const ClipKeyHandler = observer((props: PropsT) => {
  const keyHandlers = {
    'ctrl+shift+space': () => {
      props.videoPlayerState.setIsFullVideoWidth(
        !props.videoPlayerState.isFullVideoWidth
      );
    },
    ...createVideoKeyHandlers(
      props.videoPlayerState.videoController,
      props.clip.startTimeMs ? props.clip.startTimeMs / 1000 : undefined,
      props.clip.endTimeMs ? props.clip.endTimeMs / 1000 : undefined
    ),
  };

  const handledKeys = R.keys(keyHandlers);
  const onKeyDown = createKeyDownHandler(keyHandlers);

  return (
    <KeyboardEventHandler handleKeys={handledKeys} onKeyEvent={onKeyDown}>
      {props.children}
    </KeyboardEventHandler>
  );
});
