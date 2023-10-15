import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { withContextProps } from 'react-props-from-context';
import { MarkdownView } from '/src/frames/components';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistPdView.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  playlist: playlistsCtx.playlist,
};

export const PlaylistPdView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    if (isLoading(props.playlist)) return <PlaylistPdViewLoader {...props} />;
    if (!props.playlist) return null;

    const description = props.playlist.playlistPd?.description ?? '';
    if (!description.length) return null;

    return (
      <div className={cn('PlaylistPdView', [props.className])}>
        <MarkdownView text={description} />
      </div>
    );
  }, ContextProps)
);

const PlaylistPdViewLoader = observer((props: PropsT & typeof ContextProps) => {
  return <div className={cn('PlaylistPdViewLoader', props.className)}></div>;
});
