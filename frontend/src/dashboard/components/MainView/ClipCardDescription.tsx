import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipEditButton } from '/src/clips/components/ClipEditButton';
import { ClipFormView } from '/src/clips/components/ClipFormView';
import { ClipView } from '/src/clips/components/ClipView';
import { L } from '/src/frames/layout';
import { PlaylistFormView, PlaylistView } from '/src/playlists/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipCardDescription.scss';

export type PropsT = {
  showPlaylist: boolean;
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
  ...dps.isOwner,
  ...dps.clipsEdit,
  ...dps.clipPDEdit,
  ...dps.playlistsEdit,
  ...dps.playlistPDEdit,
};

export const ClipCardDescription = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const editClip = props.clipsEdit.isEditing;
    const editPlaylist = props.playlistsEdit.isEditing;

    return (
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
          <div className={cn('ClipCardDescription__Title')}>Description</div>
          {props.isOwner(props.showPlaylist ? props.playlist : props.clip) && (
            <ClipEditButton
              className="self-end"
              showPlaylist={props.showPlaylist}
              clipEdit={props.clipsEdit}
              playlistEdit={props.playlistsEdit}
            />
          )}
        </div>
        {!props.showPlaylist && !editClip && <ClipView className="" />}
        {!props.showPlaylist && editClip && <ClipFormView />}
        {props.showPlaylist && !editPlaylist && <PlaylistView />}
        {props.showPlaylist && editPlaylist && <PlaylistFormView />}
      </div>
    );
  }, DefaultProps)
);
