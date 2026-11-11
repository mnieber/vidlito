import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistSettingsView.scss';

export type PropsT = {
  className?: any;
};

export const ContextProps = {
  playlist: playlistsCtx.playlist,
};

export const PlaylistSettingsView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return <div className={cn('PlaylistSettingsView', props.className)}></div>;
  }, ContextProps)
);
