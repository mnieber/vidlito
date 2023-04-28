import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { modestButton } from 'src/frames/components/ModestButton';
import { ActionsUrlEvents, useUrlEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import './TrashButton.scss';

const useUrlEvents = () => useUrlEventHandler<typeof ActionsUrlEvents>();

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const TrashButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEvents();

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
