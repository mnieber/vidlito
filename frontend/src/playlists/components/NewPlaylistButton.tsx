import { observer } from 'mobx-react-lite';
import { PlaylistT, createPlaylist } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ToolButton } from '/src/frames/components/ToolButton';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { cn } from '/src/utils/classnames';

// Import styles
import './NewPlaylistButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.username,
  ...dps.playlistsAddition,
  ...dps.userProfile,
  ...dps.dashboardState,
  ...dps.playlistsSelection,
  ...dps.playlistsHighlight,
};

export const NewPlaylistButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <ToolButton
        className={cn('NewPlaylistButton', props.className)}
        iconName="plus"
        label="Playlist"
        onClick={() => {
          props.dashboardState.storeNavigationPoint();
          props.dashboardState.toggleIsPlaylistListExpanded(true);
          props.playlistsAddition
            .add({ values: createPlaylist(props.userProfile, {}) })
            .then((localPlaylist: PlaylistT) => {
              props.playlistsSelection.selectItem({ itemId: localPlaylist.id });
              props.playlistsHighlight.highlightItem({ id: localPlaylist.id });
              navToPlaylist(localPlaylist.ownerUsername, localPlaylist.slug);
            });
        }}
      />
    );
  }, DefaultProps)
);
