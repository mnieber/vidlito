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
import { lvi } from 'src/frames/components/Lvi';
import { ClipsUrlEventsT, useUrlEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import './ClipMenu.scss';

export type UrlEventsT = ClipsUrlEventsT;

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsDeletion,
  ...dps.clipsHighlight,
  ...dps.clipsMove,
  ...dps.clipsSelection,
  ...dps.clipsState,
  ...dps.dashboardState,
  ...dps.playlist,
  ...dps.playlists,
};

export const ClipMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEventHandler<UrlEventsT>();

    const updateUrl = React.useMemo(
      () => () => {
        const clip = props.clipsHighlight.item;
        if (!R.isNil(clip)) {
          urlEvents.clipHighlightIsCorrectedTo(clip.slug);
        }
      },
      [props.clipsHighlight, urlEvents]
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
                props.clipsMove
                  .move({ playlistId: playlist.id, copy: false })
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
                props.clipsMove.move({ playlistId: playlist.id, copy: true });
              }}
            >
              {playlist.name}
            </MenuItem>
          );
        })
      : [noPlaylistsDiv];

    return props.dashboardState.contextMenu.menuProps ? (
      <ControlledMenu
        {...props.dashboardState.contextMenu.menuProps}
        anchorPoint={props.dashboardState.contextMenu.anchorPoint}
        direction="right"
        onClose={() => props.dashboardState.closeContextMenu()}
      >
        <MenuItem
          disabled={props.clipsDeletion.disabled}
          onClick={() =>
            props.clipsDeletion
              .delete({ itemIds: props.clipsSelection.ids, moveToTrash: true })
              .then(updateUrl)
          }
        >
          <Icon className={cn(lvi.leadingIcon)} name="trash" />
          Move to Trash
        </MenuItem>
        <MenuDivider />
        <SubMenu label="Move to">{moveToPlaylistDivs}</SubMenu>
        <SubMenu label="Copy to">{copyToPlaylistDivs}</SubMenu>
      </ControlledMenu>
    ) : null;
  }, DefaultProps)
);
