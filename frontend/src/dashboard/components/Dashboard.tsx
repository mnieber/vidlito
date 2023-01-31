import React from 'react';
import { observer } from 'mobx-react-lite';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipList } from 'src/clips/components';
import { MainButtonsPanel } from 'src/dashboard/components/MainButtonsPanel';
import { ToggleClipsAndPlaylists } from 'src/dashboard/components/ToggleClipsAndPlaylists';
import { PlaylistListView } from 'src/playlists/components';
import { cn } from 'src/utils/classnames';
import './Dashboard.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.locationState,
};

export const Dashboard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const [showClips, setShowClips] = React.useState(true);

    return (
      <div
        className={cn(
          'Dashboard',
          'grid grid-cols-[400px,1fr]',
          props.className
        )}
      >
        <div className={cn('Dashboard__LeftSidebar')}>
          <MainButtonsPanel className={cn('mb-2')} />
          <ToggleClipsAndPlaylists showClips={showClips} setShowClips={setShowClips} />
          <></>
          {/* Switch */}
          <></>
          {showClips && (
            <ClipList
              updateUrl={(clip: ClipT) => props.locationState.goToClip(clip)}
            />
          )}
          {!showClips && (
            <PlaylistListView
              updateUrl={(playlist: PlaylistT) => props.locationState.goToPlaylist(playlist)}
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
