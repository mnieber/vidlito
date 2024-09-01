import {
  ControlledMenu,
  MenuDivider,
  MenuItem,
  SubMenu,
} from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { Highlight } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { dashboardNav } from '/src/dashboard/routes';
import { Icon } from '/src/frames/components';
import { MenuItemS } from '/src/frames/components/MenuItem';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { navTo } from '/src/routes/navHandler';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipMenu.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  clipsDeletion: clipsCtx.clipsDeletion,
  clipsHighlight: clipsCtx.clipsHighlight,
  clipsMove: clipsCtx.clipsMove,
  clipsSelection: clipsCtx.clipsSelection,
  dashboardState: dashboardCtx.dashboardState,
  playlist: playlistsCtx.playlist,
  playlists: playlistsCtx.playlists,
  isOwner: dashboardCtx.isOwner,
};

export const ClipMenu = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    if (!props.playlists || !props.playlist || !props.isOwner(props.playlist))
      return null;

    const otherPlaylists = props.playlists.filter(
      (x) => x.id !== props.playlist.id && props.isOwner(x)
    );
    const noPlaylistsDiv = (
      <MenuItem key="noPlaylists" disabled={true}>
        (No destination playlists)
      </MenuItem>
    );
    const moveToPlaylistDivs = otherPlaylists.length
      ? otherPlaylists.map((playlist) => {
          return (
            <MenuItem
              key={playlist.id}
              onClick={(e) => {
                e.stopPropagation = true;
                props.clipsMove
                  .move({
                    playlistId: playlist.id,
                    copy: false,
                  })
                  .then(
                    syncUrlWithHighlightedClip(
                      props.clipsHighlight,
                      props.playlist
                    )
                  );
              }}
            >
              {playlist.name}
            </MenuItem>
          );
        })
      : [noPlaylistsDiv];
    const addToPlaylistDivs = otherPlaylists.length
      ? otherPlaylists.map((playlist) => {
          return (
            <MenuItem
              key={playlist.id}
              onClick={(e) => {
                e.stopPropagation = true;
                props.clipsMove
                  .move({
                    playlistId: playlist.id,
                    copy: true,
                  })
                  .then(
                    syncUrlWithHighlightedClip(
                      props.clipsHighlight,
                      props.playlist
                    )
                  );
              }}
            >
              {playlist.name}
            </MenuItem>
          );
        })
      : [noPlaylistsDiv];

    return props.dashboardState.clipListContextMenu.menuProps ? (
      <ControlledMenu
        {...props.dashboardState.clipListContextMenu.menuProps}
        anchorPoint={props.dashboardState.clipListContextMenu.anchorPoint}
        direction="right"
        onClose={() => props.dashboardState.clipListContextMenu.close()}
      >
        <MenuItem
          disabled={props.clipsDeletion.block}
          onClick={() =>
            props.clipsDeletion
              .delete({
                itemIds: props.clipsSelection.itemIds,
                moveToTrash: true,
              })
              .then(
                syncUrlWithHighlightedClip(props.clipsHighlight, props.playlist)
              )
          }
        >
          <Icon className={cn(MenuItemS.Icon())} name="trash" />
          Move to Trash
        </MenuItem>
        <MenuDivider />
        <SubMenu label="Move to">{moveToPlaylistDivs}</SubMenu>
        <SubMenu label="Add to">{addToPlaylistDivs}</SubMenu>
      </ControlledMenu>
    ) : null;
  }, ContextProps)
);

const syncUrlWithHighlightedClip = (
  clipsHighlight: Highlight,
  playlist: PlaylistT
) => {
  return (response: any) => {
    navTo(
      dashboardNav.clip({
        ownerUsername: playlist.ownerUsername,
        playlistSlug: playlist.slug,
        clipSlug:
          clipsHighlight.itemId === undefined ? '-' : clipsHighlight.item.slug,
      })
    );
    return response;
  };
};
