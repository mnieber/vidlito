import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton } from 'src/frames/components';
import { lvi } from 'src/frames/components/Lvi';
import { PlaylistsPageEventsT, usePageEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import './NewPlaylistButton.scss';

export type PageEventsT = PlaylistsPageEventsT;

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.username,
};

export const NewPlaylistButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const pageEvents = usePageEventHandler<PageEventsT>();

    return (
      <button
        className={cn('NewPlaylistButton', mainButton, props.className)}
        onClick={() => {
          pageEvents.userCreatesNewPlaylist();
        }}
      >
        <Icon className={cn(lvi.leadingIcon)} name="plus" />
        New Playlist
      </button>
    );
  }, DefaultProps)
);
