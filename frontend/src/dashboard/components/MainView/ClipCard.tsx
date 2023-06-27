import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipDescription } from '/src/clips/components/ClipDescription';
import { ClipFormView } from '/src/clips/components/ClipFormView';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import {
  PlaylistDescription,
  PlaylistFormView,
} from '/src/playlists/components';
import { CreateFirstClip } from '/src/playlists/components/CreateFirstClip';
import { cn } from '/src/utils/classnames';
import { VideoPlayerPanel } from '/src/videos/components';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clips,
  ...dps.clipsEdit,
  ...dps.playlistsEdit,
  ...dps.dashboardState,
  ...dps.videoPlayerState,
};

export const ClipCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist =
      props.dashboardState.showPlaylistDescription || noClips;

    return (
      <>
        {!noClips && <VideoPlayerPanel className={cn('mb-3')} />}
        {!R.isNil(props.videoPlayerState.panelWidth) && (
          <div className={cn('VideoCard__Body', 'ml-6 mt-5', 'max-w-[776px]')}>
            <ClipHeaderView className={cn('mb-5')} />
            {
              // 🔳 Switch
            }
            {!showPlaylist && !props.clipsEdit.isEditing && <ClipDescription />}
            {!showPlaylist && props.clipsEdit.isEditing && <ClipFormView />}
            {showPlaylist && !props.playlistsEdit.isEditing && (
              <PlaylistDescription />
            )}
            {showPlaylist && props.playlistsEdit.isEditing && (
              <PlaylistFormView />
            )}
            {noClips && <CreateFirstClip className="mt-4 h-[400px]" />}
          </div>
        )}
      </>
    );
  }, DefaultProps)
);
