import { observer } from 'mobx-react-lite';
import React from 'react';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListView } from 'src/clips/components';
import { MainButtonsPanel } from 'src/dashboard/components/MainButtonsPanel';
import { colBanner } from 'src/frames/components';
import { PlaylistListHeader, PlaylistListView } from 'src/playlists/components';
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
          <div
            className={cn('Dashboard__ClipListViewWrapper', 'overflow-y-auto')}
          >
            <PlaylistListHeader />
            <PlaylistListView
              className={cn('overflow-y-auto')}
              isExpanded={props.dashboardState.isPlaylistListExpanded}
              updateUrl={(playlist: PlaylistT) => {
                if (props.playlist?.slug !== playlist.slug) {
                  props.urlState.setPlaylistSlug(playlist.slug, true);
                }
              }}
            />
            <ClipListView
              updateUrl={(clip: ClipT) =>
                props.urlState.setClipSlug(clip.slug, true)
              }
            />
          </div>
        </div>
        <div className={cn('Dashboard__RightMain', 'pl-4')}>
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
