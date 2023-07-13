import {
  ControlledMenu,
  MenuDivider,
  MenuItem,
  SubMenu,
} from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipMenu.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsDeletion,
  ...dps.clipsMove,
  ...dps.clipsSelection,
  ...dps.dashboardState,
  ...dps.playlist,
  ...dps.playlists,
  ...dps.isOwner,
};

export const ClipMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
                props.clipsMove.move({
                  playlistId: playlist.id,
                  playlistSlug: playlist.slug,
                  copy: false,
                });
              }}
            >
              {playlist.name}
            </MenuItem>
          );
        })
      : [noPlaylistsDiv];
    const copyToPlaylistDivs = otherPlaylists.length
      ? otherPlaylists.map((playlist) => {
          return (
            <MenuItem
              key={playlist.id}
              onClick={(e) => {
                e.stopPropagation = true;
                props.clipsMove.move({
                  playlistId: playlist.id,
                  playlistSlug: playlist.slug,
                  copy: true,
                });
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
          disabled={props.clipsDeletion.disabled}
          onClick={() =>
            props.clipsDeletion.delete({
              itemIds: props.clipsSelection.ids,
              moveToTrash: true,
            })
          }
        >
          <Icon className={cn(L.DialogButton.icon.root())} name="trash" />
          Move to Trash
        </MenuItem>
        <MenuDivider />
        <SubMenu label="Move to">{moveToPlaylistDivs}</SubMenu>
        <SubMenu label="Copy to">{copyToPlaylistDivs}</SubMenu>
      </ControlledMenu>
    ) : null;
  }, DefaultProps)
);
