import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { button, rowSkewer } from 'src/frames/components';
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
        className={cn('NewPlaylistButton', rowSkewer, button, props.className)}
        onClick={() => console.log('Moonleap Todo')}
      >
        New Playlist
      </button>
    );
  }, DefaultProps)
);
