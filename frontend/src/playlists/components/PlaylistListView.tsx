import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { withContextProps } from 'react-props-from-context';
import { DragAndDropUIConnector, SelectionUIConnector } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { dashboardNav } from '/src/dashboard/routes';
import { PlaylistListKeyHandler } from '/src/playlists/components/PlaylistListKeyHandler';
import { PlaylistListViewItem } from '/src/playlists/components/PlaylistListViewItem';
import {
  PlaylistsContext,
  playlistsCtx,
  usePlaylistsContext,
} from '/src/playlists/hooks/usePlaylistsContext';
import { navTo } from '/src/routes/navHandler';
import { cn } from '/src/utils/classnames';
import { cloneAndExtendContext } from '/src/utils/cloneAndExtendContext';

// Import styles
import './PlaylistListView.scss';

export type PropsT = {
  isExpanded: boolean;
  className?: any;
};

const ContextProps = {
  playlists: playlistsCtx.playlists,
  playlistsDragAndDrop: playlistsCtx.playlistsDragAndDrop,
  playlistsHovering: playlistsCtx.playlistsHovering,
  playlistsHighlight: playlistsCtx.playlistsHighlight,
  playlistsSelection: playlistsCtx.playlistsSelection,
  clipsSelection: clipsCtx.clipsSelection,
  dashboardState: dashboardCtx.dashboardState,
  followSet: dashboardCtx.followSet,
};

export const PlaylistListView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const playlistsContext = usePlaylistsContext();

    const dragAndDropUIConnector = new DragAndDropUIConnector({
      dragAndDrop: props.playlistsDragAndDrop,
      hovering: props.playlistsHovering,
    });
    const selectionUIConnector = new SelectionUIConnector({
      selection: props.playlistsSelection,
    });
    const goToPlaylist = (playlist: PlaylistT) => {
      props.dashboardState.panelState.toggleIsPlaylistListExpanded(false);
      navTo(
        dashboardNav.playlist({
          ownerUsername: playlist.ownerUsername,
          playlistSlug: playlist.slug,
        })
      );
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
        <PlaylistsContext.Provider
          key={playlist.id}
          value={cloneAndExtendContext(playlistsContext, {
            playlist: playlist,
          })}
        >
          <PlaylistListViewItem
            isHighlighted={
              playlist && props.playlistsHighlight.itemId === playlist.id
            }
            selectionUIProps={selectionUIConnector.handle(playlist.id)}
            dragAndDropUIProps={dragAndDropUIConnector.handle(playlist.id)}
            goToPlaylist={goToPlaylist}
            className={cn({ underline: !isFollowing })}
          />
        </PlaylistsContext.Provider>
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
  }, ContextProps)
);
