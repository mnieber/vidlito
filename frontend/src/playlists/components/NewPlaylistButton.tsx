import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton } from 'src/frames/components';
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
    return (
      <button
        className={cn('NewPlaylistButton', mainButton, props.className)}
        onClick={() => {
          props.playlistsAddition.add({});
        }}
      >
        <Icon name="plus" />
        New Playlist
      </button>
    );
  }, DefaultProps)
);
