import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Toggle } from '/src/frames/components/Toggle';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistFollowCard.scss';

export type PropsT = { className?: any };

const DefaultProps = {
  ...dps.playlistsEdit,
  ...dps.playlist,
  ...dps.playlistFollowing,
  ...dps.username,
  ...dps.dashboardState,
  ...dps.userProfile,
};

export const PlaylistFollowCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const [isChecked, setIsChecked] = React.useState(
      props.playlistFollowing.isFollowing
    );
    React.useEffect(() => {
      setIsChecked(props.playlistFollowing.isFollowing);
    }, [props.playlistFollowing.isFollowing]);

    if (props.playlist.slug === 'new-playlist') {
      return null;
    }

    if (!props.userProfile) {
      return null;
    }

    const onChange = (e: any) => {
      e.preventDefault();
      const isFollowing = e.target.checked;
      setIsChecked(isFollowing);
      props.playlistFollowing.followPlaylist({ flag: isFollowing });
    };

    return (
      <div
        className={cn('PlaylistFollowCard', [
          'grow',
          L.col.flagPoleRev(),
          props.className,
        ])}
      >
        <div className="PlaylistFollowCard__LabelWrapper">
          <label
            htmlFor="followPlaylist"
            className={cn('PlaylistFollowCard__Label', {
              'text-blue-primary': isChecked,
            })}
          >
            {isChecked ? 'Following' : 'Not following'}
          </label>
          {/* The hidden label maintains the correct width */}
          <label
            className="PlaylistFollowCard__HiddenLabel"
            htmlFor="followPlaylist"
          >
            Not following
          </label>
        </div>{' '}
        <Toggle
          className="mt-1 h-6 w-10"
          id="followPlaylist"
          onChange={onChange}
          isChecked={isChecked}
        />
      </div>
    );
  }, DefaultProps)
);
