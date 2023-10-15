import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';
import { textTrunc } from '/src/utils/strings';

// Import styles
import './AuthorCard.scss';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

const ContextProps = {
  clip: clipsCtx.clip,
  playlist: playlistsCtx.playlist,
  username: dashboardCtx.username,
  dashboardState: dashboardCtx.dashboardState,
  clips: clipsCtx.clips,
};

export const AuthorCard = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    if (!props.playlist && !props.clip) {
      return null;
    }

    const clipOwnerUsername = props.clip?.ownerUsername;
    const playlistOwnerUsername = props.playlist?.ownerUsername;

    let label1 = undefined;
    let owner1 = undefined;
    let color1 = undefined;
    let label2 = undefined;
    let owner2 = undefined;
    let color2 = undefined;

    if (
      props.clip &&
      props.playlist &&
      clipOwnerUsername === playlistOwnerUsername
    ) {
      label1 = 'Clip and playlist by';
      owner1 = clipOwnerUsername;
      color1 = 'text-blue-primary';
    } else {
      if (props.clip) {
        label1 = 'Clip by';
        owner1 = textTrunc(clipOwnerUsername, 24);
        color1 = 'text-blue-primary';
      }
      if (props.playlist) {
        if (props.clip) {
          label2 = 'Playlist by';
          owner2 = textTrunc(playlistOwnerUsername, 24);
          color2 = 'text-blue-primary';
        } else {
          label1 = 'Playlist by';
          owner1 = textTrunc(playlistOwnerUsername, 24);
          color1 = 'text-blue-primary';
        }
      }
    }

    return (
      <div
        className={cn('AuthorCard', [
          'flex flex-row flex-wrap',
          props.className,
        ])}
      >
        {label1 && <div className={cn('AuthorCard__Label')}>{label1}</div>}
        {owner1 && (
          <div className={cn('AuthorCard__Owner ml-1', color1)}>{owner1}</div>
        )}
        {label2 && <div className={cn('AuthorCard__Label ml-2')}>{label2}</div>}
        {owner2 && (
          <div className={cn('AuthorCard__Owner', 'ml-1', color2)}>
            {owner2}
          </div>
        )}
        {props.children}
      </div>
    );
  }, ContextProps)
);
