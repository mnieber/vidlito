import { observer } from 'mobx-react-lite';
import React from 'react';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipListView } from '/src/clips/components';
import { ClipVideoKeyHandler } from '/src/clips/components/ClipVideoKeyHandler';
import { MainButtonsPanel } from '/src/dashboard/components/MainButtonsPanel';
import { Logo } from '/src/frames/components';
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
};

export const Dashboard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const playlistNotFound = !isLoading(props.playlist) && !props.playlist;
    const separator = ['my-2', 'border-t border-textGray'];

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
            L.row.banner(),
            props.className
          )}
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
          {
            // 🔳 RightMain 🔳
          }
          <div
            className={cn(
              'Dashboard__RightMain',
              'overflow-y-auto',
              'bg-gray-200',
              //
              //
              'grow'
            )}
          >
            {props.children}
          </div>
        </div>
      </ClipVideoKeyHandler>
    );
  }, DefaultProps)
);
