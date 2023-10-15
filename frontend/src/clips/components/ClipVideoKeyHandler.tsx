import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { withContextProps } from 'react-props-from-context';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { createKeyDownHandler } from '/src/utils';
import { cn } from '/src/utils/classnames';
import { createVideoKeyHandlers } from '/src/videos/createVideoKeyHandlers';
import { videoPlayerCtx } from '/src/videos/hooks/useVideoPlayerContext';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

const ContextProps = {
  clip: clipsCtx.clip,
  videoPlayerState: videoPlayerCtx.videoPlayerState,
  dashboardState: dashboardCtx.dashboardState,
};

export const ClipVideoKeyHandler = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const keyHandlers = {
      'ctrl+shift+space': () => {
        props.dashboardState.panelState.setIsFullVideoWidth(
          !props.dashboardState.panelState.isFullVideoWidth
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
  }, ContextProps)
);
