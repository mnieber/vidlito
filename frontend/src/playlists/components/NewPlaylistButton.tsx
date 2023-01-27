import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './NewPlaylistButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const NewPlaylistButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn('NewPlaylistButton', mainButton, props.className)}
        onClick={() => console.log('Moonleap Todo')}
      >
        <Icon name="plus" />
        New Playlist
      </button>
    );
  }, DefaultProps)
);
