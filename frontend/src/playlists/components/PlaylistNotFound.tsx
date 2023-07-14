import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';
import { useDelayedFlag } from '/src/utils/hooks/useDelayedFlag';

// Import styles
import './PlaylistNotFound.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const PlaylistNotFound = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const noPlaylist = useDelayedFlag(!props.playlist, 1000);
    if (!noPlaylist || props.playlist || isLoading(props.playlist)) {
      return null;
    }

    return (
      <div
        className={cn(
          'PlaylistNotFound',
          'flex flex-col justify-evenly',
          'w-full',
          'grow',
          props.className
        )}
      >
        <div className={cn('PlaylistNotFound__Message')}>
          Oops, it seems this playlist doesn't exist
        </div>
      </div>
    );
  }, DefaultProps)
);
