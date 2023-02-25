import {
  ControlledMenu,
  MenuDivider,
  MenuItem,
  SubMenu,
} from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import './ClipMenu.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsDeletion,
  ...dps.clipsHighlight,
  ...dps.clipsSelection,
  ...dps.clipsState,
  ...dps.dashboardState,
  ...dps.playlist,
  ...dps.playlists,
  ...dps.urlState,
};

export const ClipMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const updateUrl = React.useMemo(
      () => () => {
        const clip = props.clipsHighlight.item;
        if (!R.isNil(clip)) {
          props.urlState.setClipSlug(clip.slug, true);
        }
      },
      [props.clipsHighlight, props.urlState]
    );

    if (!props.playlists || !props.playlist) return null;

    const otherPlaylists = props.playlists.filter(
      (x) => x.id !== props.playlist.id
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
                props.clipsState
                  .moveClipsToPlaylist(playlist.id, false)
                  .then(updateUrl);
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
                props.clipsState.moveClipsToPlaylist(playlist.id, true);
              }}
            >
              {playlist.name}
            </MenuItem>
          );
        })
      : [noPlaylistsDiv];

    return props.dashboardState.menuProps ? (
      <ControlledMenu
        {...props.dashboardState.menuProps}
        anchorPoint={props.dashboardState.anchorPoint}
        direction="right"
        onClose={() => props.dashboardState.closeContextMenu()}
      >
        <MenuItem
          onClick={() =>
            props.clipsDeletion
              .delete(props.clipsSelection.ids, {
                moveToTrash: true,
              })
              .then(updateUrl)
          }
        >
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
