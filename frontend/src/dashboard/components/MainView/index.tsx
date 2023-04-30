import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipDescription } from 'src/clips/components/ClipDescription';
import { ClipFormView } from 'src/clips/components/ClipFormView';
import { ClipHeaderView } from 'src/clips/components/ClipHeaderView';
import { ClipKeyHandler } from 'src/clips/components/ClipKeyHandler';
import { AccountMenu, Spinner, rowBanner } from 'src/frames/components';
import {
  PlaylistDescription,
  PlaylistFormView,
} from 'src/playlists/components';
import { isLoading } from 'src/resourceStates';
import { cn } from 'src/utils/classnames';
import { VideoPlayerPanel } from 'src/videos/components';

// Import styles
import './index.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEdit,
  ...dps.playlistsEdit,
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
        <div className={cn(rowBanner)}>
          <div
            ref={parentElmRef}
            tabIndex={0}
            className={cn('MainView', 'grow max-w-[800px]', props.className)}
          >
            <VideoPlayerPanel className={cn('mb-3')} />
            <div className={cn('ml-6 mt-5')}>
              <ClipHeaderView className={cn('mb-5')} />
              {
                // 🔳 Switch
              }
              {props.dashboardState.showPlaylistDescription &&
                !props.playlistsEdit.isEditing && (
                  <PlaylistDescription className="max-w-[776px]" />
                )}
              {props.dashboardState.showPlaylistDescription &&
                props.playlistsEdit.isEditing && <PlaylistFormView />}
              {!props.dashboardState.showPlaylistDescription &&
                props.clipsEdit.isEditing && <ClipFormView />}
              {!props.dashboardState.showPlaylistDescription &&
                !props.clipsEdit.isEditing && <ClipDescription />}
            </div>
          </div>
          <AccountMenu className="ml-8 self-start" />
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
