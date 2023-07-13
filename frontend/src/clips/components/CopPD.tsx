import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipPDView } from '/src/clips/components';
import { ClipPDFormView } from '/src/clips/components/ClipPDFormView';
import { EditButton } from '/src/clips/components/EditButton';
import { L } from '/src/frames/layout';
import { PlaylistPDView } from '/src/playlists/components';
import { PlaylistPDFormView } from '/src/playlists/components/PlaylistPDFormView';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopPD.scss';

export type PropsT = {
  showPlaylist: boolean;
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
  ...dps.clipPDEdit,
  ...dps.playlistPDEdit,
  ...dps.userProfile,
};

export const CopPD = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const editClipPD = props.clipPDEdit.isEditing;
    const editPlaylistPD = props.playlistPDEdit.isEditing;

    return (
      <div
        className={cn(
          'CopPD',
          //
          //
          'py-[18px] px-4'
        )}
      >
        <div
          className={cn(
            'CopPD__TopRow',
            L.row.skewer(),
            'grow',
            'justify-between'
          )}
        >
          <div className={cn('CopPD__Title')}>
            {`${props.showPlaylist ? 'Playlist' : 'Clip'} private data`}
          </div>
          <EditButton
            className="self-end"
            edit={props.showPlaylist ? props.playlistPDEdit : props.clipPDEdit}
            enabled={!!props.userProfile}
          />
        </div>
        {!props.showPlaylist && !editClipPD && <ClipPDView className="" />}
        {!props.showPlaylist && editClipPD && <ClipPDFormView />}
        {props.showPlaylist && !editPlaylistPD && <PlaylistPDView />}
        {props.showPlaylist && editPlaylistPD && <PlaylistPDFormView />}
      </div>
    );
  }, DefaultProps)
);
