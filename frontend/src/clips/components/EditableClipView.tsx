import { observer } from 'mobx-react-lite';
import React from 'react';
import { isLoaded } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipFormView } from 'src/clips/components/ClipFormView';
import { ClipKeyHandler } from 'src/clips/components/ClipKeyHandler';
import { ClipView } from 'src/clips/components/ClipView';
import UIkit from 'src/frames/styles/uikit';
import { cn } from 'src/utils/classnames';
import { VideoPlayerPanel } from 'src/videos/components';
import { useVideoPlayerState } from 'src/videos/hooks';
import './EditableClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEditing,
};

export const EditableClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!isLoaded(props.clip)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.clip) return null;

    return <EditableClipViewInner {...props} />;
  }, DefaultProps)
);

export const EditableClipViewInner = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const parentElmRef = React.useRef<HTMLDivElement>(null);
    const videoPlayerState = useVideoPlayerState({
      clip: props.clip,
      parentElmRef,
    });

    return (
      <ClipKeyHandler videoPlayerState={videoPlayerState}>
        <div
          ref={parentElmRef}
          tabIndex={123}
          className={cn('EditableClipView', props.className)}
        >
          <VideoPlayerPanel
            videoPlayerState={videoPlayerState}
            className={cn('mb-2')}
          />
          {/*              */}
          {/* 🟩 Switch 🟩 */}
          {/*              */}
          {props.clipsEditing.isEditing && (
            <ClipFormView videoController={videoPlayerState.videoController} />
          )}
          {!props.clipsEditing.isEditing && <ClipView />}
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
