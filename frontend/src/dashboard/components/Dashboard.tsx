import { observer } from 'mobx-react-lite';
import React from 'react';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListView } from 'src/clips/components';
import { MainButtonsPanel } from 'src/dashboard/components/MainButtonsPanel';
import { ToggleClipsAndPlaylists } from 'src/dashboard/components/ToggleClipsAndPlaylists';
import { colBanner } from 'src/frames/components';
import { PlaylistListView } from 'src/playlists/components';
import { cn } from 'src/utils/classnames';
import './Dashboard.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.urlState,
  ...dps.playlist,
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
        <div className={cn('Dashboard__LeftSidebar', colBanner)}>
          <MainButtonsPanel className={cn('mb-2')} />
          <ToggleClipsAndPlaylists
            className={cn('pb-2', 'border-b border-gray-400')}
          />
          <div
            className={cn('Dashboard__ClipListViewTitle', 'py-1', {
              invisible: false && !props.dashboardState.showClips,
            })}
          >
            {props.playlist?.name}
          </div>
          {/*              */}
          {/* 🟩 Switch 🟩 */}
          {/*              */}
          {props.dashboardState.showClips && (
            <div className={cn('Dashboard__ClipListViewWrapper')}>
              <ClipListView
                className={cn('overflow-y-auto')}
                updateUrl={(clip: ClipT) =>
                  props.urlState.goToClip(clip, props.playlist.slug)
                }
              />
            </div>
          )}
          {!props.dashboardState.showClips && (
            <PlaylistListView
              className={cn('overflow-y-auto')}
              updateUrl={(playlist: PlaylistT) =>
                props.urlState.goToPlaylist(playlist.slug)
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
