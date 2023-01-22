import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import { NewIcon } from 'src/frames/icons/NewIcon';
import { cn } from 'src/utils/classnames';
import './ClipBar.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const ClipBar = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ClipBar', 'grid grid-cols-[1fr]', props.className)}>
        <div className={cn('ClipBar__Rhs', rowSkewer, 'justify-end')}>
          <button
            className={cn('ClipBar__AddClipButton', rowSkewer)}
            onClick={() => console.log('Moonleap Todo')}
          >
            <NewIcon />
            Add clip
          </button>
        </div>
      </div>
    );
  }, DefaultProps)
);
