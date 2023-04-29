import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListView } from 'src/clips/components';
import { MainButtonsPanel } from 'src/dashboard/components/MainButtonsPanel';
import { Logo, colBanner, rowBanner } from 'src/frames/components';
import { PlaylistListPicker } from 'src/playlists/components/PlaylistListPicker';
import { cln, cn, d } from 'src/utils/classnames';
import './Dashboard.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.playlist,
};

export const Dashboard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      //
      // 🔳 DashBoard 🔳
      //
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
        {
          // 🔳 LeftSideBar 🔳
        }
        <div
          className={cn(
            d('Dashboard__LeftSidebar'),
            colBanner,
            'w-[290px] mr-4'
          )}
        >
          <Logo />
          <MainButtonsPanel className={cn('')} />
          <PlaylistListPicker />
          <ClipListView className={cn('overflow-y-auto', 'mt-4')} />
        </div>
        {
          // 🔳 RightMain 🔳
        }
        <div
          className={cln(
            'Dashboard__RightMain',
            'overflow-y-auto',
            'bg-gray-200'
          )(
            //
            'pb-6',
            'grow'
          )}
        >
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
