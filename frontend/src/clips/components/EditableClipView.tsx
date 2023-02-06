import { observer } from 'mobx-react-lite';
import React from 'react';
import { isAvailable } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipFormView } from 'src/clips/components/ClipFormView';
import { ClipKeyHandler } from 'src/clips/components/ClipKeyHandler';
import { ClipView } from 'src/clips/components/ClipView';
import UIkit from 'src/frames/styles/uikit';
import { cn } from 'src/utils/classnames';
import { VideoPlayerPanel } from 'src/videos/components';
import './EditableClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEditing,
  ...dps.videoPlayerState,
  ...dps.dashboardState,
};

export const EditableClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const parentElmRef = React.useRef<HTMLDivElement>(null);
    const parentElm = parentElmRef.current;

    React.useEffect(() => {
      props.dashboardState.setVideoPlayerParentElm(parentElm);
    }, [props.dashboardState, parentElm]);

    if (!isAvailable(props.clip)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.clip) return null;

    return (
      <ClipKeyHandler
        clip={props.clip}
        videoPlayerState={props.videoPlayerState}
      >
        <div
          ref={parentElmRef}
          tabIndex={123}
          className={cn('EditableClipView', props.className)}
        >
          <VideoPlayerPanel className={cn('mb-3')} />
          {/*              */}
          {/* 🟩 Switch 🟩 */}
          {/*              */}
          {props.clipsEditing.isEditing && <ClipFormView />}
          {!props.clipsEditing.isEditing && <ClipView />}
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
