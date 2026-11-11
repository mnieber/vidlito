import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { withContextProps } from 'react-props-from-context';
import { CopDescription } from '/src/clips/components/CopDescription';
import { CopPd } from '/src/clips/components/CopPd';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { CardS } from '/src/frames/components/Card';
import { CopSettings } from '/src/playlists/components/CopSettings';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopCardForms.scss';

export type PropsT = {
  className?: any;
};

export const ContextProps = {
  playlist: playlistsCtx.playlist,
  clip: clipsCtx.clip,
  dashboardState: dashboardCtx.dashboardState,
  isOwner: dashboardCtx.isOwner,
  clips: clipsCtx.clips,
};

export const CopCardForms = observer(
  withContextProps(
    (props: PropsT & typeof ContextProps & typeof ContextProps) => {
      const separator = ['my-4', 'border-t border-gray-300'];
      const noClips = !props.clips.length && !isLoading(props.clips);
      const showPlaylist =
        props.dashboardState.panelState.showPlaylistView || noClips;
      const cop = showPlaylist ? props.playlist : props.clip;

      return (
        <div
          className={cn(CardS.size.medium(), 'CopCardForms', [props.className])}
        >
          <CopDescription showPlaylist={showPlaylist} className="" />
          {!cop?.isTransient && (
            <>
              <div className={cn(separator)} />
              <CopPd showPlaylist={showPlaylist} className="" />
            </>
          )}
          {props.isOwner(cop) && !cop?.isTransient && (
            <>
              <div className={cn(separator)} />
              <CopSettings className="" showPlaylist={showPlaylist} />
            </>
          )}
        </div>
      );
    },
    ContextProps
  )
);
