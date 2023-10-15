import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { ClipListView } from '/src/clips/components';
import { MainButtonsPanel } from '/src/dashboard/components/MainButtonsPanel';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { Logo } from '/src/frames/components';
import { Footer } from '/src/frames/components/Footer';
import { L } from '/src/frames/layout';
import { PlaylistListPicker } from '/src/playlists/components/PlaylistListPicker';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './Dashboard.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const ContextProps = {
  playlist: playlistsCtx.playlist,
  dashboardState: dashboardCtx.dashboardState,
};

export const Dashboard = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const playlistNotFound = !isLoading(props.playlist) && !props.playlist;
    const separator = ['my-2', 'border-t border-gray-text'];

    return (
      //
      // 🔳 DashBoard 🔳
      //
      <div className={cn('DashboardWrapper', 'h-full', L.col.banner())}>
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
      </div>
    );
  }, ContextProps)
);
