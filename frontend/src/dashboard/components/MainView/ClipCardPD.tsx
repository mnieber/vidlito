import { ClipPDView } from '/src/clips/components';
import { ClipPDFormView } from '/src/clips/components/ClipPDFormView';
import { Icon } from '/src/frames/components';
import { PlaylistPDView } from '/src/playlists/components';
import { PlaylistPDFormView } from '/src/playlists/components/PlaylistPDFormView';
import { cn } from '/src/utils/classnames';

export const ClipCardPD = () => {
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
            className={cn('PDEditButton__Icon', L.ToolButton.icon.small())}
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
  );
};
