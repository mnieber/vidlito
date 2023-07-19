import { observer } from 'mobx-react-lite';
import {
  createDragAndDropUIConnector,
  SelectionUIConnector,
} from 'skandha-facets';
import { isLoading } from '/src/api/getState';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { PlaylistListKeyHandler } from '/src/playlists/components/PlaylistListKeyHandler';
import { PlaylistListViewItem } from '/src/playlists/components/PlaylistListViewItem';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistListView.scss';

export type PropsT = {
  isExpanded: boolean;
  className?: any;
};

const DefaultProps = {
  ...dps.playlists,
  ...dps.playlistsDragAndDrop,
  ...dps.playlistsHovering,
  ...dps.playlistsHighlight,
  ...dps.playlistsSelection,
  ...dps.clipsSelection,
  ...dps.dashboardState,
  ...dps.followSet,
};

export const PlaylistListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const dragAndDropUIConnector = createDragAndDropUIConnector(
      props.playlistsDragAndDrop,
      props.playlistsHovering
    );
    const selectionUIConnector = new SelectionUIConnector({
      selection: props.playlistsSelection,
    });
    const goToPlaylist = (playlist: PlaylistT) => {
      navToPlaylist(playlist.ownerUsername, playlist.slug);
    };

    if (isLoading(props.playlists)) {
      return null;
    }

    if (!props.isExpanded) {
      return null;
    }

    const noItems = <h2>There are no playlists</h2>;

    const playlistDivs = props.playlists.map((playlist, idx) => {
      const isFollowing = !!props.followSet.find(
        (x: PlaylistT) => x.id === playlist.id
      );

      return (
        <PlaylistListViewItem
          key={playlist.id}
          playlist={playlist}
          isHighlighted={
            playlist && props.playlistsHighlight.id === playlist.id
          }
          selectionUIProps={selectionUIConnector.handle(playlist.id)}
          dragAndDropUIProps={dragAndDropUIConnector.handle(playlist.id)}
          goToPlaylist={goToPlaylist}
          className={cn('', { underline: !isFollowing })}
        />
      );
    });

    return (
      <PlaylistListKeyHandler>
        <div className={cn('PlaylistListView', props.className)} tabIndex={0}>
          {playlistDivs.length > 0 && playlistDivs}
          {playlistDivs.length === 0 && noItems}
        </div>
      </PlaylistListKeyHandler>
    );
  }, DefaultProps)
);
