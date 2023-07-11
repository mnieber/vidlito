import { ClipEditButton } from '/src/clips/components/ClipEditButton';
import { ClipFormView } from '/src/clips/components/ClipFormView';
import { ClipView } from '/src/clips/components/ClipView';
import { PlaylistFormView, PlaylistView } from '/src/playlists/components';

export const ClipCardDescription = () => {
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
  );
};
