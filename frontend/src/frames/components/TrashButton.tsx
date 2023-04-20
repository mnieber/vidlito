import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { modestButton } from 'src/frames/components/ModestButton';
import { ActionsUrlEventsT, useUrlEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import './TrashButton.scss';

export type UrlEventsT = ActionsUrlEventsT;

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const TrashButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEventHandler<UrlEventsT>();

    return (
      <button
        className={cn('TrashButton', modestButton.container, props.className)}
        onClick={() => urlEvents.goToActions()}
      >
        <Icon className={cn(modestButton.icon)} name="trash" />
        Trash
      </button>
    );
  }, DefaultProps)
);
