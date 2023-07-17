import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipPdView } from '/src/clips/components';
import { ClipPdFormView } from '/src/clips/components/ClipPdFormView';
import { EditButton } from '/src/clips/components/EditButton';
import { L } from '/src/frames/layout';
import { PlaylistPdView } from '/src/playlists/components';
import { PlaylistPdFormView } from '/src/playlists/components/PlaylistPdFormView';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopPd.scss';

export type PropsT = {
  showPlaylist: boolean;
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
  ...dps.clipPdEdit,
  ...dps.playlistPdEdit,
  ...dps.userProfile,
};

export const CopPd = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const editClipPd = props.clipPdEdit.isEditing;
    const editPlaylistPd = props.playlistPdEdit.isEditing;

    return (
      <div
        className={cn(
          'CopPd',
          //
          //
          'py-[18px] px-4',
          props.className
        )}
      >
        <div
          className={cn(
            'CopPd__TopRow',
            L.row.skewer(),
            'grow',
            'justify-between'
          )}
        >
          <div className={cn('CopPd__Title')}>
            {`${props.showPlaylist ? 'Playlist' : 'Clip'} private data`}
          </div>
          <EditButton
            className="self-end"
            edit={props.showPlaylist ? props.playlistPdEdit : props.clipPdEdit}
            enabled={!!props.userProfile}
          />
        </div>
        {!props.showPlaylist && !editClipPd && <ClipPdView className="mt-4" />}
        {!props.showPlaylist && editClipPd && (
          <ClipPdFormView className="mt-4" />
        )}
        {props.showPlaylist && !editPlaylistPd && (
          <PlaylistPdView className="mt-4" />
        )}
        {props.showPlaylist && editPlaylistPd && (
          <PlaylistPdFormView className="mt-4" />
        )}
      </div>
    );
  }, DefaultProps)
);
