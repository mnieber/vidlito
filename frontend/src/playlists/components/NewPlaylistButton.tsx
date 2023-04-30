import { observer } from 'mobx-react-lite';
import { PlaylistT, createPlaylist } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { PlaylistsUrlEvents, useUrlEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';

// Import styles
import './NewPlaylistButton.scss';

const useUrlEvents = () => useUrlEventHandler<typeof PlaylistsUrlEvents>();

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.username,
  ...dps.playlistsAddition,
  ...dps.userProfile,
};

export const NewPlaylistButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEvents();
    const l = L.ToolButton;

    return (
      <button
        className={cn('NewPlaylistButton', l.root, props.className)}
        onClick={() => {
          props.playlistsAddition
            .add({ values: createPlaylist(props.userProfile, {}) })
            .then((localPlaylist: PlaylistT) => {
              urlEvents.userHighlightsPlaylist(localPlaylist.slug);
            });
        }}
      >
        <Icon className={cn(l.icon.normal)} name="plus" />
        Playlist
      </button>
    );
  }, DefaultProps)
);
