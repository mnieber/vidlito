import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { dashboardNav } from '/src/dashboard/routes';
import { ToolButton } from '/src/frames/components/ToolButton';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { navTo } from '/src/routes/navHandler';
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
            ? navTo(
                dashboardNav.playlistActions({
                  playlistSlug: props.playlist.slug,
                })
              )
            : navTo(dashboardNav.actions({}))
        }
      />
    );
  }, ContextProps)
);
