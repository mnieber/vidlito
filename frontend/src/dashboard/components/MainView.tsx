import { observer } from 'mobx-react-lite';
import React from 'react';
import { isLoading } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipFormView } from 'src/clips/components/ClipFormView';
import { ClipHeaderView } from 'src/clips/components/ClipHeaderView';
import { ClipKeyHandler } from 'src/clips/components/ClipKeyHandler';
import { ClipView } from 'src/clips/components/ClipView';
import { Spinner } from 'src/frames/components';
import {
  PlaylistDescription,
  PlaylistFormView,
} from 'src/playlists/components';
import { cn } from 'src/utils/classnames';
import { VideoPlayerPanel } from 'src/videos/components';
import './MainView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEditing,
  ...dps.playlistsEditing,
  ...dps.videoPlayerState,
  ...dps.dashboardState,
};

export const MainView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const parentElmRef = React.useRef<HTMLDivElement>(null);
    const parentElm = parentElmRef.current;

    React.useEffect(() => {
      props.dashboardState.setVideoPlayerParentElm(parentElm);
    }, [props.dashboardState, parentElm]);

    if (isLoading(props.clip)) {
      return <Spinner />;
    } else if (!props.clip) return null;

    return (
      <ClipKeyHandler
        clip={props.clip}
        videoPlayerState={props.videoPlayerState}
      >
        <div
          ref={parentElmRef}
          tabIndex={123}
          className={cn('MainView', props.className)}
        >
          <VideoPlayerPanel className={cn('mb-3')} />
          <ClipHeaderView className={cn('mb-2')} />
          {/*              */}
          {/* 🟩 Switch 🟩 */}
          {/*              */}
          {props.dashboardState.showPlaylistDescription &&
            !props.playlistsEditing.isEditing && <PlaylistDescription />}
          {props.dashboardState.showPlaylistDescription &&
            props.playlistsEditing.isEditing && <PlaylistFormView />}
          {!props.dashboardState.showPlaylistDescription &&
            props.clipsEditing.isEditing && <ClipFormView />}
          {!props.dashboardState.showPlaylistDescription &&
            !props.clipsEditing.isEditing && <ClipView />}
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
