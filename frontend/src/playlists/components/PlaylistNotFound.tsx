import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { WallPaperCardL } from '/src/frames/components/WallPaperCard';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';
import { cn } from '/src/utils/classnames';
import { useDelayedFlag } from '/src/utils/hooks/useDelayedFlag';
import { log } from '/src/utils/logging';

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
    const params = useNavHandlerParams();
    const noPlaylist = useDelayedFlag(
      !props.playlist && !isLoading(props.playlist),
      1000,
      [params.playlistSlug]
    );
    if (!noPlaylist) {
      return null;
    }
    log('PlaylistNotFound');

    return (
      <div
        className={cn(
          'PlaylistNotFound',
          WallPaperCardL.root(),
          //
          //
          props.className
        )}
      >
        <div
          className={cn('PlaylistNotFound__Message', WallPaperCardL.message())}
        >
          Oops, it seems this playlist doesn't exist
        </div>
      </div>
    );
  }, DefaultProps)
);
