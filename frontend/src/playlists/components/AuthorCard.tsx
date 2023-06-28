import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { textTrunc } from '/src/utils/strings';

// Import styles
import './AuthorCard.scss';

export type PropsT = { className?: any };

const DefaultProps = {
  ...dps.clip,
  ...dps.clips,
  ...dps.playlist,
  ...dps.username,
  ...dps.dashboardState,
};

export const AuthorCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!props.playlist && !props.clip) {
      return null;
    }

    const clipOwnerUsername = props.clip?.owner.username;
    const playlistOwnerUsername = props.playlist?.owner.username;

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
      color1 = 'text-primaryBlue';
    } else {
      if (props.clip) {
        label1 = 'Clip by';
        owner1 = textTrunc(clipOwnerUsername, 24);
        color1 = 'text-primaryBlue';
      }
      if (props.playlist) {
        if (props.clip) {
          label2 = 'Playlist by';
          owner2 = textTrunc(playlistOwnerUsername, 24);
          color2 = 'text-primaryBlue';
        } else {
          label1 = 'Playlist by';
          owner1 = textTrunc(playlistOwnerUsername, 24);
          color1 = 'text-primaryBlue';
        }
      }
    }

    return (
      <div
        className={cn(
          'AuthorCard',
          //
          //
          L.row.flagPole(),
          props.className
        )}
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
      </div>
    );
  }, DefaultProps)
);
