import { observer } from 'mobx-react-lite';
import { PlaylistT, createPlaylist } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
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
    const l = L.ToolButton;

    return (
      <button
        className={cn(
          'NewPlaylistButton',
          //
          //
          l.root(),
          props.className
        )}
        onClick={() => {
          props.dashboardState.toggleIsPlaylistListExpanded(true);
          props.playlistsAddition
            .add({ values: createPlaylist(props.userProfile, {}) })
            .then((localPlaylist: PlaylistT) => {
              props.playlistsSelection.selectItem({ itemId: localPlaylist.id })
              props.playlistsHighlight.highlightItem({ id: localPlaylist.id })
            });
        }}
      >
        <Icon className={cn(l.icon.normal())} name="plus" />
        Playlist
      </button>
    );
  }, DefaultProps)
);
