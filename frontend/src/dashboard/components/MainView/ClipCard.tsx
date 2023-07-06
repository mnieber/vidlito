import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipPDView } from '/src/clips/components';
import { ClipDescription } from '/src/clips/components/ClipDescription';
import { ClipFormView } from '/src/clips/components/ClipFormView';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import { ClipPDFormView } from '/src/clips/components/ClipPDFormView';
import { PDViewHeader } from '/src/clips/components/PDViewHeader';
import { L } from '/src/frames/layout';
import {
  PlaylistDescription,
  PlaylistFormView,
  PlaylistPDView,
} from '/src/playlists/components';
import { CreateFirstClip } from '/src/playlists/components/CreateFirstClip';
import { PlaylistPDFormView } from '/src/playlists/components/PlaylistPDFormView';
import { cn } from '/src/utils/classnames';
import { VideoPlayerPanel } from '/src/videos/components';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
  ...dps.clipsEdit,
  ...dps.clipPDEdit,
  ...dps.playlistsEdit,
  ...dps.playlistPDEdit,
  ...dps.dashboardState,
  ...dps.videoPlayerState,
};

export const ClipCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist =
      props.dashboardState.showPlaylistDescription || noClips;
    const showClip = !showPlaylist;
    const editClip = props.clipsEdit.isEditing;
    const editClipPD = props.clipPDEdit.isEditing;
    const editPlaylist = props.playlistsEdit.isEditing;
    const editPlaylistPD = props.playlistPDEdit.isEditing;

    return (
      <>
        {!noClips && <VideoPlayerPanel className={cn('mb-3')} />}
        {!R.isNil(props.videoPlayerState.panelWidth) && (
          <div
            className={cn(
              'ClipCard__Body',
              //
              //
              L.col.banner(),
              'ml-6 mt-5',
              'max-w-[776px]'
            )}
          >
            <ClipHeaderView className={cn('mb-3')} />
            {
              // 🔳 Switch: Clip
            }
            {showClip && !editClip && <ClipDescription />}
            {showClip && editClip && <ClipFormView />}
            {showClip && (
              <PDViewHeader pdEdit={props.clipPDEdit} className="mt-8" />
            )}
            {showClip && !editClipPD && <ClipPDView className="" />}
            {showClip && editClipPD && <ClipPDFormView />}
            {
              // 🔳 Switch: Playlist
            }
            {showPlaylist && !editPlaylist && <PlaylistDescription />}
            {showPlaylist && editPlaylist && <PlaylistFormView />}
            {showPlaylist && (
              <PDViewHeader pdEdit={props.playlistPDEdit} className="mt-8" />
            )}
            {showPlaylist && !editPlaylistPD && <PlaylistPDView />}
            {showPlaylist && editPlaylistPD && <PlaylistPDFormView />}
            {noClips && <CreateFirstClip className="mt-4" />}
          </div>
        )}
      </>
    );
  }, DefaultProps)
);
