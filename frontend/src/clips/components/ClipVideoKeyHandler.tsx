import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { createKeyDownHandler } from '/src/utils';
import { cn } from '/src/utils/classnames';
import { createVideoKeyHandlers } from '/src/videos/createVideoKeyHandlers';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

const DefaultProps = {
  ...dps.clip,
  ...dps.videoPlayerState,
};

export const ClipVideoKeyHandler = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const keyHandlers = {
      'ctrl+shift+space': () => {
        props.videoPlayerState.setIsFullVideoWidth(
          !props.videoPlayerState.isFullVideoWidth
        );
      },
      ...createVideoKeyHandlers(
        props.videoPlayerState.videoController,
        props.clip?.startTimeMs ? props.clip.startTimeMs / 1000 : undefined,
        props.clip?.endTimeMs ? props.clip.endTimeMs / 1000 : undefined
      ),
    };

    const handledKeys = R.keys(keyHandlers);
    const onKeyDown = createKeyDownHandler(keyHandlers);

    return (
      <KeyboardEventHandler
        handleKeys={handledKeys}
        onKeyEvent={onKeyDown}
        className={cn('ClipVideoKeyHandler', props.className)}
      >
        {props.children}
      </KeyboardEventHandler>
    );
  }, DefaultProps)
);
