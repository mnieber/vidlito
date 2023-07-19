import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { WallPaperCardL } from '/src/frames/components/WallPaperCard';
import { useIsPlaylistNotFound } from '/src/playlists/hooks/useIsPlaylistNotFound';
import { cn } from '/src/utils/classnames';
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
    const { isPlaylistNotFound } = useIsPlaylistNotFound();
    if (!isPlaylistNotFound(props.playlist)) {
      return null;
    }
    log('PlaylistNotFound');

    return (
      <div
        className={cn(
          'PlaylistNotFound',
          [],
          [WallPaperCardL.root(), props.className]
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
