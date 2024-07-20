import { observer } from 'mobx-react-lite';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { Toggle } from '/src/frames/components/Toggle';
import { L } from '/src/frames/layout';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistFollowCard.scss';

export type PropsT = { className?: any };

const ContextProps = {
  playlistsEdit: playlistsCtx.playlistsEdit,
  playlist: playlistsCtx.playlist,
  playlistFollowing: playlistsCtx.playlistFollowing,
  username: dashboardCtx.username,
  dashboardState: dashboardCtx.dashboardState,
  userProfile: dashboardCtx.userProfile,
};

export const PlaylistFollowCard = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
  }, ContextProps)
);
