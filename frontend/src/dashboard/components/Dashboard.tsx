import { observer } from 'mobx-react-lite';
import React from 'react';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipListView } from '/src/clips/components';
import { ClipVideoKeyHandler } from '/src/clips/components/ClipVideoKeyHandler';
import { MainButtonsPanel } from '/src/dashboard/components/MainButtonsPanel';
import { Logo } from '/src/frames/components';
import { Footer } from '/src/frames/components/Footer';
import { L } from '/src/frames/layout';
import { PlaylistListPicker } from '/src/playlists/components/PlaylistListPicker';
import { cn } from '/src/utils/classnames';

// Import styles
import './Dashboard.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.playlist,
  ...dps.dashboardState,
};

export const Dashboard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const playlistNotFound = !isLoading(props.playlist) && !props.playlist;
    const separator = ['my-2', 'border-t border-gray-text'];

    return (
      //
      // 🔳 DashBoard 🔳
      //
      <ClipVideoKeyHandler className={cn('h-full', L.col.banner())}>
        <div
          className={cn('Dashboard', [
            'h-full',
            L.row.banner(),
            props.className,
          ])}
        >
          <div
            className={cn('Dashboard__LeftSpacer')}
            style={{
              flexBasis: '160px',
              flexShrink: 1000,
            }}
          />
          {
            // 🔳 LeftSideBar 🔳
          }
          <div
            className={cn(
              'Dashboard__LeftSidebar',
              {
                'Dashboard__LeftSidebar--open':
                  props.dashboardState.panelState.isSidebarOpen,
              },
              [L.col.banner(), 'w-[290px] min-w-[290px] mx-2 lg:mx-4']
            )}
          >
            <Logo />
            <MainButtonsPanel className={cn('')} />
            <div className={cn('Dashboard__Separator', separator)} />
            <PlaylistListPicker />
            <div className={cn('Dashboard__Separator', separator)} />
            {!playlistNotFound && (
              <>
                <ClipListView
                  className={cn('overflow-y-auto flex-grow', 'mt-4')}
                />
              </>
            )}
          </div>
          {
            // 🔳 RightMain 🔳
          }
          <div
            className={cn(
              'Dashboard__RightMain',
              {
                'Dashboard__RightMain--open':
                  props.dashboardState.panelState.isSidebarOpen,
              },
              ['grow']
            )}
            style={{
              flexBasis: props.dashboardState.panelState.maxVideoWidth + 'px',
              flexShrink: 1,
            }}
          >
            {props.children}
          </div>
        </div>
        {<div className={cn('MainView__Spacer')} />}
        {<Footer />}
      </ClipVideoKeyHandler>
    );
  }, DefaultProps)
);
