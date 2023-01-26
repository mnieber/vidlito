import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { primaryButton, rowSkewer } from 'src/frames/components';
import { NewIcon } from 'src/frames/icons/NewIcon';
import { cn } from 'src/utils/classnames';
import './NewClipOrPlaylistButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const NewClipOrPlaylistButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn(
          'NewClipOrPlaylistButton',
          rowSkewer,
          primaryButton,
          props.className
        )}
        onClick={() => console.log('Moonleap Todo')}
      >
        <NewIcon />
        New
      </button>
    );
  }, DefaultProps)
);
