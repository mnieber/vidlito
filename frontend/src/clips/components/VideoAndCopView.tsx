import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { ClipNotFound } from '/src/clips/components/ClipNotFound';
import { CopCard } from '/src/clips/components/CopCard';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { useIsClipNotFound } from '/src/clips/hooks/useIsClipNotFound';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { L } from '/src/frames/layout';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';
import { VideoPlayerPanel } from '/src/videos/components';

// Import styles
import './VideoAndCopView.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  clip: clipsCtx.clip,
  playlist: playlistsCtx.playlist,
  dashboardState: dashboardCtx.dashboardState,
};

export const VideoAndCopView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const { isClipNotFound } = useIsClipNotFound();

    if (!props.playlist) {
      return null;
    }

    const clipNotFound = isClipNotFound(props.clip);

    return (
      <div className={cn('VideoAndCopView', [L.col.banner(), props.className])}>
        {clipNotFound && <ClipNotFound />}
        {!clipNotFound && <VideoPlayerPanel />}
        <CopCard className={cn('max-w-[776px]', 'mx-2 my-8 lg:ml-6 lg:mr-2')} />
      </div>
    );
  }, ContextProps)
);
