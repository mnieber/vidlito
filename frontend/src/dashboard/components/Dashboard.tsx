import { observer } from 'mobx-react-lite';
import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipListView } from '/src/clips/components';
import { ClipVideoKeyHandler } from '/src/clips/components/ClipVideoKeyHandler';
import { MainButtonsPanel } from '/src/dashboard/components/MainButtonsPanel';
import { useOnResizeDashboard } from '/src/dashboard/hooks/useOnResizeDashboard';
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
  ...dps.videoPlayerState,
};

export const Dashboard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const refLeftSidebar = React.useRef<HTMLDivElement>(null);
    const playlistNotFound = !isLoading(props.playlist) && !props.playlist;
    const separator = ['my-2', 'border-t border-textGray'];

    const { onResize } = useOnResizeDashboard({
      leftSidebarWidth: refLeftSidebar.current?.clientWidth ?? 0,
      videoPlayerState: props.videoPlayerState,
    });

    return (
      //
      // 🔳 DashBoard 🔳
      //
      <ClipVideoKeyHandler className="h-full">
        <div
          className={cn(
            'Dashboard',
            'grow',
            'h-full',
            //
            //
            L.col.banner(),
            props.className
          )}
        >
          <ReactResizeDetector handleWidth onResize={onResize} />
          <div className={cn('Dashboard__Top', L.row.banner(), 'grow')}>
            <div
              ref={refLeftSidebar}
              className={cn('Dashboard__LeftSidebarWrapper', L.row.banner())}
            >
              <div
                className={cn(
                  'Dashboard__LeftSpacer',
                  'lg:w-[160px] lg:min-w-[160px]'
                )}
              />
              {
                // 🔳 LeftSideBar 🔳
              }
              <div
                className={cn(
                  'Dashboard__LeftSidebar__',
                  //
                  //
                  L.col.banner(),
                  'w-[290px] min-w-[290px] mx-2 lg:mx-4'
                )}
              >
                <Logo />
                <MainButtonsPanel className={cn('')} />
                <div className={cn('Dashboard__Separator__', separator)} />
                <PlaylistListPicker />
                <div className={cn('Dashboard__Separator__', separator)} />
                {!playlistNotFound && (
                  <>
                    <ClipListView className={cn('overflow-y-auto', 'mt-4')} />
                  </>
                )}
              </div>
            </div>
            {
              // 🔳 RightMain 🔳
            }
            <div
              className={cn(
                'Dashboard__RightMain',
                'bg-gray-200',
                //
                //
                'grow'
              )}
            >
              {props.children}
            </div>
          </div>
          <div className={cn('MainView__Spacer', '')} />
          <Footer />
        </div>
      </ClipVideoKeyHandler>
    );
  }, DefaultProps)
);
