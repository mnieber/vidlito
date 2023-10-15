import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { navToActions, navToPlaylistActions } from '/src/actions/navFunctions';
import { ToolButton } from '/src/frames/components/ToolButton';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  playlist: playlistsCtx.playlist,
};

export const TrashButton = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <ToolButton
        className={cn('TrashButton', props.className)}
        iconName="search"
        label="Trash"
        onClick={() =>
          props.playlist
            ? navToPlaylistActions(props.playlist.slug)
            : navToActions()
        }
      />
    );
  }, ContextProps)
);
