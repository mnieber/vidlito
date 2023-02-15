import { observer } from 'mobx-react-lite';
import React from 'react';
import { isUpdating } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './ToggleClipsAndPlaylists.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.clips,
  ...dps.playlists,
};

export const ToggleClipsAndPlaylists = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const showClips = React.useMemo(
      () => () => props.dashboardState.setShowClips(true),
      [props.dashboardState]
    );
    const showPlaylists = React.useMemo(
      () => () => props.dashboardState.setShowClips(false),
      [props.dashboardState]
    );

    return (
      <div
        className={cn(
          'ToggleClipsAndPlaylists',
          rowSkewer,
          'justify-around',
          props.className
        )}
      >
        <button
          className={cn('ToggleClipsAndPlaylists__Playlists', 'p-2', 'grow', {
            'ToggleClipsAndPlaylists__Toggle--selected':
              !props.dashboardState.showClips,
            'animate-[pulse_1s_ease-in-out_infinite]': isUpdating(
              props.playlists
            ),
          })}
          onClick={showPlaylists}
        >
          Playlists
        </button>
        <button
          className={cn('ToggleClipsAndPlaylists__Clips', 'p-2', 'grow', {
            'ToggleClipsAndPlaylists__Toggle--selected':
              props.dashboardState.showClips,
            'animate-[pulse_1s_ease-in-out_infinite]': isUpdating(props.clips),
          })}
          onClick={showClips}
        >
          Clips
        </button>
      </div>
    );
  }, DefaultProps)
);
