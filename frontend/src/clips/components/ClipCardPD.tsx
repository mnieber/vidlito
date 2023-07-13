import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipPDView } from '/src/clips/components';
import { ClipEditButton } from '/src/clips/components/ClipEditButton';
import { ClipPDFormView } from '/src/clips/components/ClipPDFormView';
import { L } from '/src/frames/layout';
import { PlaylistPDView } from '/src/playlists/components';
import { PlaylistPDFormView } from '/src/playlists/components/PlaylistPDFormView';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipCardPD.scss';

export type PropsT = {
  showPlaylist: boolean;
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
  ...dps.clipPDEdit,
  ...dps.playlistPDEdit,
};

export const ClipCardPD = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const editClipPD = props.clipPDEdit.isEditing;
    const editPlaylistPD = props.playlistPDEdit.isEditing;

    return (
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
          <div className={cn('ClipCardPD__Title')}>Private data</div>
          <ClipEditButton
            className="self-end"
            showPlaylist={props.showPlaylist}
            clipEdit={props.clipPDEdit}
            playlistEdit={props.playlistPDEdit}
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
