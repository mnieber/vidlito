import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MessageCard, MessageCardS } from '/src/frames/components/MessageCard';
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
      <MessageCard
        className={cn('PlaylistNotFound', [props.className])}
        wallPaper={true}
      >
        <div
          className={cn(MessageCardS.Message(), 'PlaylistNotFound__Message')}
        >
          Oops, it seems this playlist doesn't exist
        </div>
      </MessageCard>
    );
  }, DefaultProps)
);
