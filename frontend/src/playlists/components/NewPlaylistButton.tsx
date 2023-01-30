import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton } from 'src/frames/components';
import { useRouteUfns } from 'src/routes/hooks/useRoutes';
import { cn } from 'src/utils/classnames';
import './NewPlaylistButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlistsAddition,
};

export const NewPlaylistButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { routeUfns, history } = useRouteUfns();

    return (
      <button
        className={cn('NewPlaylistButton', mainButton, props.className)}
        onClick={() => {}}
      >
        <Icon name="plus" />
        New Playlist
      </button>
    );
  }, DefaultProps)
);

// const ufn = routeUfns.playlist(history.push);
// ufn('new-playlist');
