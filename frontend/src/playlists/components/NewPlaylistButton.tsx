import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton } from 'src/frames/components';
import { lvi } from 'src/frames/components/Lvi';
import { PlaylistsUrlEventsT, useUrlEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import './NewPlaylistButton.scss';

export type UrlEventsT = PlaylistsUrlEventsT;

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.username,
};

export const NewPlaylistButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEventHandler<UrlEventsT>();

    return (
      <button
        className={cn('NewPlaylistButton', mainButton, props.className)}
        onClick={() => {
          urlEvents.userCreatesNewPlaylist();
        }}
      >
        <Icon className={cn(lvi.leadingIcon)} name="plus" />
        New Playlist
      </button>
    );
  }, DefaultProps)
);
