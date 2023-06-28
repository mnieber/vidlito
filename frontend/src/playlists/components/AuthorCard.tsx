import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { textTrunc } from '/src/utils/strings';

// Import styles
import './AuthorCard.scss';

export type PropsT = {};

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

    return (
      <div
        className={cn(
          'AuthorCard',
          //
          //
          L.col.flagPole()
        )}
      >
        {props.clip && (
          <div className="AuthorCard__Item">{`Clip by: ${textTrunc(
            props.clip.owner.username,
            24
          )}`}</div>
        )}
        {props.playlist && (
          <div className="AuthorCard__Item">{`Playlist by: ${textTrunc(
            props.playlist.owner.username,
            24
          )}`}</div>
        )}
      </div>
    );
  }, DefaultProps)
);
