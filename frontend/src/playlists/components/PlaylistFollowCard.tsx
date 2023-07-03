import { observer } from 'mobx-react-lite';
import React from 'react';
import { useFollowPlaylist } from '/src/api/mutations/useFollowPlaylist';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistFollowCard.scss';

export type PropsT = { className?: any };

const DefaultProps = {
  ...dps.playlistsEdit,
  ...dps.playlist,
  ...dps.username,
  ...dps.dashboardState,
  ...dps.followSet,
};

export const PlaylistFollowCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const isFollowing = !!props.followSet.find(
      (x: PlaylistT) => x.id === props.playlist.id
    );
    const [isChecked, setIsChecked] = React.useState(isFollowing);
    React.useEffect(() => {
      setIsChecked(isFollowing);
    }, [isFollowing]);

    const followPlaylist = useFollowPlaylist();

    const onChange = (e: any) => {
      e.preventDefault();
      const isFollowing = e.target.checked;
      setIsChecked(isFollowing);
      followPlaylist.mutate({
        playlistId: props.playlist.id,
        isFollowing: isFollowing,
      });
    };

    return (
      <div
        className={cn(
          'PlaylistFollowCard',
          'text-gray-700',
          'grow',
          //
          //
          L.col.flagPoleRev(),
          props.className
        )}
      >
        <div className="PlaylistFollowCard__LabelWrapper">
          <label
            htmlFor="followPlaylist"
            className={cn('PlaylistFollowCard__Label', {
              'text-primaryBlue': isChecked,
            })}
          >
            {isChecked ? 'Following' : 'Not following'}
          </label>
          <label
            className="PlaylistFollowCard__HiddenLabel"
            htmlFor="followPlaylist"
          >
            Not following
          </label>
        </div>{' '}
        <label
          htmlFor="followPlaylist"
          className="relative mt-1 h-6 w-10 cursor-pointer"
        >
          <input
            key={isChecked ? 'checked' : 'unchecked'}
            type="checkbox"
            id="followPlaylist"
            className="peer sr-only"
            onChange={onChange}
            checked={isChecked}
          />
          <span className="PlaylistFollowCard__ToggleContainer"></span>
          <span className="PlaylistFollowCard__Toggle"></span>
        </label>
      </div>
    );
  }, DefaultProps)
);
