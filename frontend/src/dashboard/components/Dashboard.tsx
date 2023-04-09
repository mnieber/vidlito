import { observer } from 'mobx-react-lite';
import React from 'react';
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
          <MainButtonsPanel className={cn('')} />
          <div className={cn('Dashboard__Separator', 'my-2')} />
          <div
            className={cn('Dashboard__ClipListViewWrapper', 'overflow-y-auto')}
          >
            <PlaylistListHeader />
            <PlaylistListView
              className={cn('overflow-y-auto')}
              isExpanded={props.dashboardState.isPlaylistListExpanded}
            />
            <div className={cn('Dashboard__Separator', 'my-2')} />
            <ClipListView />
          </div>
        </div>
        <div className={cn('Dashboard__RightMain', 'pl-4')}>
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
