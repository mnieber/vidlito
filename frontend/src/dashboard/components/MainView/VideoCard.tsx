import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipDescription } from '/src/clips/components/ClipDescription';
import { ClipFormView } from '/src/clips/components/ClipFormView';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import {
  PlaylistDescription,
  PlaylistFormView,
} from '/src/playlists/components';
import { cn } from '/src/utils/classnames';
import { VideoPlayerPanel } from '/src/videos/components';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsEdit,
  ...dps.playlistsEdit,
  ...dps.dashboardState,
};

export const VideoCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <>
        <VideoPlayerPanel className={cn('mb-3')} />
        <div className={cn('ml-6 mt-5', 'max-w-[776px]')}>
          <ClipHeaderView className={cn('mb-5')} />
          {
            // 🔳 Switch
          }
          {!props.dashboardState.showPlaylistDescription &&
            !props.clipsEdit.isEditing && <ClipDescription />}
          {!props.dashboardState.showPlaylistDescription &&
            props.clipsEdit.isEditing && <ClipFormView />}
          {props.dashboardState.showPlaylistDescription &&
            !props.playlistsEdit.isEditing && <PlaylistDescription />}
          {props.dashboardState.showPlaylistDescription &&
            props.playlistsEdit.isEditing && <PlaylistFormView />}
        </div>
      </>
    );
  }, DefaultProps)
);
