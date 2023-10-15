import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { withContextProps } from 'react-props-from-context';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { Icon } from '/src/frames/components';
import { IconS } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistListHeader.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  playlist: playlistsCtx.playlist,
  playlists: playlistsCtx.playlists,
  dashboardState: dashboardCtx.dashboardState,
};

export const PlaylistListHeader = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    if (!props.playlists.length) return null;

    const playlist = props.playlist ?? R.head(props.playlists);

    return (
      <div
        className={cn('PlaylistListHeader', [
          L.row.skewer(),
          'justify-between',
          props.className,
        ])}
        onClick={() =>
          props.dashboardState.panelState.toggleIsPlaylistListExpanded()
        }
      >
        <div className={cn()}>{playlist.name}</div>
        <Icon
          className={cn(IconS.size.s30(), IconS.color.gray())}
          name={
            props.dashboardState.panelState.isPlaylistListExpanded
              ? 'cheveronDown'
              : 'cheveronRight'
          }
        />
      </div>
    );
  }, ContextProps)
);
