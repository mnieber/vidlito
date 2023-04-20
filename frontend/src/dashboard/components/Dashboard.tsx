import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListView } from 'src/clips/components';
import { MainButtonsPanel } from 'src/dashboard/components/MainButtonsPanel';
import { Logo, colBanner, rowBanner } from 'src/frames/components';
import { PlaylistListHeader, PlaylistListView } from 'src/playlists/components';
import { cn, d } from 'src/utils/classnames';
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
    const separator = ['my-2', 'border-t border-gray-700'];

    return (
      <div
        className={cn(
          //
          'Dashboard',
          'grow',
          rowBanner,
          props.className
        )}
      >
        <div className={cn('w-[160px]')} />
        <div
          className={cn(
            d('Dashboard__LeftSidebar'),
            colBanner,
            'w-[290px] min-h-0 mr-4'
          )}
        >
          <Logo />
          <MainButtonsPanel className={cn('')} />
          <div className={cn(d('Dashboard__Separator'), separator)} />
          <div
            className={cn('Dashboard__ClipListViewWrapper', 'overflow-y-auto')}
          >
            <PlaylistListHeader />
            <PlaylistListView
              className={cn('overflow-y-auto')}
              isExpanded={props.dashboardState.isPlaylistListExpanded}
            />
            <div className={cn(d('Dashboard__Separator'), separator)} />
            <ClipListView className={cn('mt-6')} />
          </div>
        </div>
        <div className={cn(d('Dashboard__RightMain'), 'grow', 'bg-gray-50')}>
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
