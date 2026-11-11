import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { ClipPdView } from '/src/clips/components';
import { ClipPdFormView } from '/src/clips/components/ClipPdFormView';
import { EditButton } from '/src/clips/components/EditButton';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { L } from '/src/frames/layout';
import { PlaylistPdView } from '/src/playlists/components';
import { PlaylistPdFormView } from '/src/playlists/components/PlaylistPdFormView';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopPd.scss';

export type PropsT = {
  showPlaylist: boolean;
  className?: any;
};

const ContextProps = {
  clipPdEdit: clipsCtx.clipPdEdit,
  playlistPdEdit: playlistsCtx.playlistPdEdit,
  userProfile: dashboardCtx.userProfile,
  clips: clipsCtx.clips,
};

export const CopPd = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const View = props.showPlaylist ? PlaylistPdView : ClipPdView;
    const FormView = props.showPlaylist ? PlaylistPdFormView : ClipPdFormView;
    const edit = props.showPlaylist ? props.playlistPdEdit : props.clipPdEdit;

    return (
      <div className={cn('CopPd', [props.className])}>
        <div
          className={cn('CopPd__TopRow', [
            L.row.skewer(),
            'grow',
            'justify-between',
          ])}
        >
          <div className={cn('CopPd__Title')}>
            {`${props.showPlaylist ? 'Playlist' : 'Clip'} private data`}
          </div>
          <EditButton
            className="self-end"
            edit={edit}
            disabled={!props.userProfile}
          />
        </div>
        {!edit.isEditing && <View className="mt-4" />}
        {edit.isEditing && <FormView className="mt-4" />}
      </div>
    );
  }, ContextProps)
);
