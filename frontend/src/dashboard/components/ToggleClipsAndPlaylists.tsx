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
  ...dps.clip,
  ...dps.clips,
  ...dps.playlists,
  ...dps.urlState,
};

export const ToggleClipsAndPlaylists = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const updateUrl = React.useMemo(
      () => () => {
        if (props.clip) {
          props.urlState.setClipSlug(props.clip.slug, true);
        }
      },
      [props.urlState, props.clip]
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
          onClick={() => {
            props.dashboardState.setShowClips(false);
            updateUrl();
          }}
        >
          Playlists
        </button>
        <button
          className={cn('ToggleClipsAndPlaylists__Clips', 'p-2', 'grow', {
            'ToggleClipsAndPlaylists__Toggle--selected':
              props.dashboardState.showClips,
            'animate-[pulse_1s_ease-in-out_infinite]': isUpdating(props.clips),
          })}
          onClick={() => {
            props.dashboardState.setShowClips(true);
            updateUrl();
          }}
        >
          Clips
        </button>
      </div>
    );
  }, DefaultProps)
);
