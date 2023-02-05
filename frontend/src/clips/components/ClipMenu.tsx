import {
  ControlledMenu,
  MenuDivider,
  MenuItem,
  SubMenu,
} from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import './ClipMenu.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsDeletion,
  ...dps.dashboardState,
  ...dps.clipsState,
  ...dps.playlists,
  ...dps.playlist,
};

export const ClipMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!props.playlists || !props.playlist) return null;

    const otherPlaylists = props.playlists.filter(
      (x) => x.id !== props.playlist.id
    );
    const moveToPlaylistDivs = otherPlaylists.map((playlist) => {
      return (
        <MenuItem
          key={playlist.id}
          onClick={(e) => {
            e.stopPropagation = true;
            props.clipsState.moveClipsToPlaylist(playlist.id, false);
          }}
        >
          {playlist.name}
        </MenuItem>
      );
    });
    const copyToPlaylistDivs = otherPlaylists.map((playlist) => {
      return (
        <MenuItem
          key={playlist.id}
          onClick={(e) => {
            e.stopPropagation = true;
            props.clipsState.moveClipsToPlaylist(playlist.id, true);
          }}
        >
          {playlist.name}
        </MenuItem>
      );
    });

    return props.dashboardState.menuProps ? (
      <ControlledMenu
        {...props.dashboardState.menuProps}
        anchorPoint={props.dashboardState.anchorPoint}
        direction="right"
        onClose={() => props.dashboardState.closeContextMenu()}
      >
        <MenuItem>
          <Icon name="trash" />
          Move to Trash
        </MenuItem>
        <MenuDivider />
        <SubMenu label="Move to">{moveToPlaylistDivs}</SubMenu>
        <SubMenu label="Copy to">{copyToPlaylistDivs}</SubMenu>
      </ControlledMenu>
    ) : null;
  }, DefaultProps)
);
