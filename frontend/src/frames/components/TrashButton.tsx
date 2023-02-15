import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './TrashButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const TrashButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn('TrashButton', mainButton, props.className)}
        onClick={() => console.log('Moonleap Todo')}
      >
        <div className={cn(rowSkewer)}>
          <Icon name="trash" />
          Trash
        </div>
      </button>
    );
  }, DefaultProps)
);
