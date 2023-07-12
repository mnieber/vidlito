import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';

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
    if (props.playlist || isLoading(props.playlist)) {
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
