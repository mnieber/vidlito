import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
import { lvi } from 'src/frames/components/Lvi';
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
          <Icon className={cn(lvi.leadingIcon)} name="trash" />
          Trash
        </div>
      </button>
    );
  }, DefaultProps)
);
