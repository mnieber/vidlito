import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { ClipDescription } from '/src/clips/components/ClipDescription';
import { ClipFormView } from '/src/clips/components/ClipFormView';
import { EditButton } from '/src/clips/components/EditButton';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { L } from '/src/frames/layout';
import {
  PlaylistDescription,
  PlaylistFormView,
} from '/src/playlists/components';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopDescription.scss';

export type PropsT = {
  showPlaylist: boolean;
  className?: any;
};

const ContextProps = {
  clip: clipsCtx.clip,
  playlist: playlistsCtx.playlist,
  isOwner: dashboardCtx.isOwner,
  clipsEdit: clipsCtx.clipsEdit,
  clipPdEdit: clipsCtx.clipPdEdit,
  playlistsEdit: playlistsCtx.playlistsEdit,
  playlistPdEdit: playlistsCtx.playlistPdEdit,
  userProfile: dashboardCtx.userProfile,
};

export const CopDescription = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const cop = props.showPlaylist ? props.playlist : props.clip;
    const edit = props.showPlaylist ? props.playlistsEdit : props.clipsEdit;
    const View = props.showPlaylist ? PlaylistDescription : ClipDescription;
    const FormView = props.showPlaylist ? PlaylistFormView : ClipFormView;

    return (
      <div className={cn('CopDescription', [props.className])}>
        <div
          className={cn('CopDescription__TopRow', [
            L.row.skewer(),
            'grow',
            'justify-between',
          ])}
        >
          <div className={cn('CopDescription__Title')}>Description</div>
          {props.userProfile && (
            <EditButton
              className="self-end"
              edit={edit}
              disabled={cop && !props.isOwner(cop)}
            />
          )}
        </div>
        {!edit.isEditing && <View className="mt-4" />}
        {edit.isEditing && <FormView className="mt-4" />}
      </div>
    );
  }, ContextProps)
);
