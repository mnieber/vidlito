import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipPDView } from '/src/clips/components';
import { ClipEditButton } from '/src/clips/components/ClipEditButton';
import { ClipFormView } from '/src/clips/components/ClipFormView';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import { ClipPDFormView } from '/src/clips/components/ClipPDFormView';
import { ClipView } from '/src/clips/components/ClipView';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import {
  PlaylistFormView,
  PlaylistPDView,
  PlaylistView,
} from '/src/playlists/components';
import { AuthorCard } from '/src/playlists/components/AuthorCard';
import { CreateFirstClip } from '/src/playlists/components/CreateFirstClip';
import { PlaylistPDFormView } from '/src/playlists/components/PlaylistPDFormView';
import { TagsCard } from '/src/playlists/components/TagsCard';
import { cn } from '/src/utils/classnames';
import { VideoPlayerPanel } from '/src/videos/components';

// Import styles
import './ClipCard.scss';

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
    const showPlaylist = props.dashboardState.showPlaylistView || noClips;
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
            <ClipHeaderView className={cn('mb-8')} />
            <AuthorCard className="" />
            <TagsCard className="mt-2" />
            {
              // 🔳 Frame
            }
            <div
              className={cn(
                'ClipCard__Frame',
                //
                //
                'py-[18px] px-4',
                'my-8'
              )}
            >
              <div
                className={cn(
                  'ClipCard__FrameTopRow',
                  L.row.skewer(),
                  'grow',
                  'justify-between'
                )}
              >
                <div>Description</div>
                <ClipEditButton
                  className="self-end"
                  showPlaylist={props.dashboardState.showPlaylistView}
                />
              </div>
              {showClip && !editClip && <ClipView className="" />}
              {showClip && editClip && <ClipFormView />}
              {showPlaylist && !editPlaylist && <PlaylistView />}
              {showPlaylist && editPlaylist && <PlaylistFormView />}
            </div>
            {
              // 🔳 PDFrame
            }
            <div
              className={cn(
                'ClipCard__PDFrame',
                //
                //
                'py-[18px] px-4'
              )}
            >
              <div
                className={cn(
                  'ClipPDFrame__TopRow',
                  L.row.skewer(),
                  'grow',
                  'justify-between'
                )}
              >
                <div>Private data</div>
                <button
                  className={cn(
                    'PDEditButton',
                    //
                    //
                    L.ToolButton.root()
                  )}
                  onClick={() => {
                    props.clipPDEdit.enable();
                  }}
                >
                  <Icon
                    className={cn(
                      'PDEditButton__Icon',
                      L.ToolButton.icon.small()
                    )}
                    name="pencil"
                  />
                  Edit
                </button>
              </div>
              {showClip && !editClipPD && <ClipPDView className="" />}
              {showClip && editClipPD && <ClipPDFormView />}
              {showPlaylist && !editPlaylistPD && <PlaylistPDView />}
              {showPlaylist && editPlaylistPD && <PlaylistPDFormView />}
            </div>
            {noClips && <CreateFirstClip className="mt-4" />}
          </div>
        )}
      </>
    );
  }, DefaultProps)
);
