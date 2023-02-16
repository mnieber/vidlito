import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './TrashButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.locationState,
  ...dps.playlist,
};

export const TrashButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn('TrashButton', mainButton, props.className)}
        onClick={() => props.locationState.goToActions()}
      >
        <div className={cn(rowSkewer)}>
          <Icon name="trash" />
          Trash
        </div>
      </button>
    );
  }, DefaultProps)
);
