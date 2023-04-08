import { observer } from 'mobx-react-lite';
import { ActionsUIEventsT } from 'src/actions/ActionsUIEvents';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
import { lvi } from 'src/frames/components/Lvi';
import { useUIEventHandler } from 'src/uiEvents';
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
    const uiEvents = useUIEventHandler<ActionsUIEventsT>();

    return (
      <button
        className={cn('TrashButton', mainButton, props.className)}
        onClick={() => uiEvents.goToActions()}
      >
        <div className={cn(rowSkewer)}>
          <Icon className={cn(lvi.leadingIcon)} name="trash" />
          Trash
        </div>
      </button>
    );
  }, DefaultProps)
);
