import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './TrashButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.urlState,
  ...dps.playlist,
};

export const TrashButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn('TrashButton', mainButton, props.className)}
        onClick={() => props.urlState.goToActions()}
      >
        <div className={cn(rowSkewer)}>
          <Icon name="trash" className="mr-2" />
          Trash
        </div>
      </button>
    );
  }, DefaultProps)
);
