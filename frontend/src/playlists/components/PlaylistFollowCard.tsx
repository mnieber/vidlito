import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistFollowCard.scss';

export type PropsT = {};

const DefaultProps = {
  ...dps.playlistsEdit,
  ...dps.playlist,
  ...dps.username,
  ...dps.dashboardState,
};

export const PlaylistFollowCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const [isChecked, setIsChecked] = React.useState(false);

    const onChange = (e: any) => {
      setIsChecked(e.target.checked);
    };

    return (
      <div
        className={cn(
          'PlaylistFollowCard',
          'text-gray-700',
          //
          //
          L.row.flagPole()
        )}
      >
        <label
          htmlFor="followPlaylist"
          className={cn('PlaylistFollowCard__Text mr-2', {
            'text-primaryBlue': isChecked,
          })}
        >
          {isChecked ? 'Following' : 'Not following'}
        </label>
        <label
          htmlFor="followPlaylist"
          className="relative mt-1 h-6 w-10 cursor-pointer"
        >
          <input
            type="checkbox"
            id="followPlaylist"
            className="peer sr-only"
            onChange={onChange}
          />
          <span className="PlaylistFollowCard__ToggleContainer"></span>
          <span className="PlaylistFollowCard__Toggle"></span>
        </label>
      </div>
    );
  }, DefaultProps)
);
