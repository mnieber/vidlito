import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { withContextProps } from 'react-props-from-context';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { useIsClipNotFound } from '/src/clips/hooks/useIsClipNotFound';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { L } from '/src/frames/layout';
import { PlaylistFollowCard } from '/src/playlists/components/PlaylistFollowCard';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';
import { SwitchButton } from '/src/utils/components/SwitchButton';

// Import styles
import './ClipHeaderView.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  clip: clipsCtx.clip,
  clips: clipsCtx.clips,
  playlist: playlistsCtx.playlist,
  dashboardState: dashboardCtx.dashboardState,
};

export const ClipHeaderView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const { isClipNotFound } = useIsClipNotFound();

    if (isLoading(props.clips)) {
      return <ClipHeaderViewLoader className={props.className} />;
    }

    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist =
      noClips ||
      props.dashboardState.panelState.showPlaylistView ||
      isClipNotFound(props.clip);

    return (
      <div className={cn('ClipHeaderView', [L.col.banner(), props.className])}>
        <div className={cn('ClipHeaderView__Buttons', [L.row.banner()])}>
          <SwitchButton
            state={showPlaylist ? 'left' : 'right'}
            fontSize="big"
            hasRight={!!props.clip}
            onToggle={(state: 'left' | 'right') =>
              props.dashboardState.panelState.toggleShowPlaylistView(
                state === 'left'
              )
            }
            textLeft={props.playlist.name}
            textRight={props.clip?.name}
          />
          <div className={cn('grow')} />
          <PlaylistFollowCard className={cn('ml-4')} />
        </div>
      </div>
    );
  }, ContextProps)
);

export const ClipHeaderViewLoader = observer((props: { className?: any }) => {
  return (
    <LoaderBar
      className={cn('ClipHeaderViewLoader', ['h-[50px]', props.className])}
    />
  );
});
