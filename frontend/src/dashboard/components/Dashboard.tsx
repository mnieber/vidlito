import { observer } from 'mobx-react-lite';
import React from 'react';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListView } from 'src/clips/components';
import { MainButtonsPanel } from 'src/dashboard/components/MainButtonsPanel';
import { ToggleClipsAndPlaylists } from 'src/dashboard/components/ToggleClipsAndPlaylists';
import { PlaylistListView } from 'src/playlists/components';
import { cn } from 'src/utils/classnames';
import './Dashboard.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.playlist,
  ...dps.locationState,
  ...dps.dashboardState,
};

export const Dashboard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'Dashboard',
          'grid grid-cols-[400px,1fr]',
          props.className
        )}
      >
        <div className={cn('Dashboard__LeftSidebar', 'flex flex-col')}>
          <MainButtonsPanel className={cn('mb-2')} />
          <ToggleClipsAndPlaylists />
          <></>
          {/* Switch */}
          <></>
          {props.dashboardState.showClips && (
            <ClipListView
              className={cn('overflow-y-auto')}
              updateUrl={(clip: ClipT) =>
                props.locationState.goToClip(clip, props.playlist)
              }
            />
          )}
          {!props.dashboardState.showClips && (
            <PlaylistListView
              className={cn('overflow-y-auto')}
              updateUrl={(playlist: PlaylistT) =>
                props.locationState.goToPlaylist(playlist)
              }
            />
          )}
        </div>
        <div className={cn('Dashboard__RightMain', 'pl-4')}>
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
