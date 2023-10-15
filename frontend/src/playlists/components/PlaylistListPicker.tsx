import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { withContextProps } from 'react-props-from-context';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { L } from '/src/frames/layout';
import {
  PlaylistListHeader,
  PlaylistListView,
} from '/src/playlists/components';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { RouterLink } from '/src/routes/components';
import { getRouteFns } from '/src/routes/routeTable';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistListPicker.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  clips: clipsCtx.clips,
  playlist: playlistsCtx.playlist,
  playlists: playlistsCtx.playlists,
  userProfile: dashboardCtx.userProfile,
  dashboardState: dashboardCtx.dashboardState,
};

export const PlaylistListPicker = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const routeFns = getRouteFns<AuthRoutesT>();

    if (isLoading(props.playlists) || isLoading(props.clips)) {
      return <PlaylistListPickerLoader {...props} />;
    }

    if (!props.playlists.length) {
      return (
        <div className={cn('PlaylistListPicker__Empty')}>
          You have no playlists yet.
          {!props.userProfile && (
            <>
              {' '}
              <RouterLink to={routeFns.signUp()}>
                Create an account
              </RouterLink>{' '}
              to add one.
            </>
          )}
        </div>
      );
    }

    return (
      <div
        className={cn('PlaylistListPicker', [L.col.banner(), props.className])}
      >
        <PlaylistListHeader />
        <PlaylistListView
          className={cn('overflow-y-auto')}
          isExpanded={props.dashboardState.panelState.isPlaylistListExpanded}
        />
      </div>
    );
  }, ContextProps)
);

export const PlaylistListPickerLoader = observer(
  (props: PropsT & typeof ContextProps) => {
    return (
      <LoaderBar
        className={cn('PlaylistListPickerLoader', [
          'h-3 my-4',
          props.className,
        ])}
      />
    );
  }
);
