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
    const refLeftSidebar = React.useRef<HTMLDivElement>(null);
    const playlistNotFound = !isLoading(props.playlist) && !props.playlist;
    const separator = ['my-2', 'border-t border-gray-text'];

    const [w] = React.useState(800);

    return (
      <div className="flex h-screen">
        <div
          className="bg-green-500"
          style={{ flexBasis: '100px', flexShrink: 1000 }}
        ></div>
        <div ref={refLeftSidebar} className="shrink-0 bg-blue-500 w-64"></div>
        <div
          className={cn('', {})}
          style={{ flexBasis: w + 'px', flexShrink: 1 }}
        >
          {props.children}
        </div>
      </div>
    );

    return (
      //
      // 🔳 DashBoard 🔳
      //
      <ClipVideoKeyHandler className="h-full">
        <div
          className={cn(
            'Dashboard',
            [],
            ['grow', 'h-full', L.col.banner(), props.className]
          )}
        >
          <div className={cn('Dashboard__Top', L.row.banner(), 'grow')}>
            <div
              className={cn('Dashboard__LeftSpacer')}
              style={{
                flexBasis: w + 'px',
                flexShrink: 1000,
              }}
            />
            {
              // 🔳 LeftSideBar 🔳
            }
            <div
              ref={refLeftSidebar}
              className={cn(
                'Dashboard__LeftSidebar',
                [],
                [L.col.banner(), 'w-[290px] min-w-[290px] mx-2 lg:mx-4']
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
              style={{ flexShrink: 1 }}
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
