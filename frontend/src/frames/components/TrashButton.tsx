import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { ActionsUrlEvents, useUrlEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';

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
    const l = L.ToolButton;

    return (
      <button
        className={cn(
          'TrashButton',
          //
          //
          l.root(),
          props.className
        )}
        onClick={() => urlEvents.goToActions()}
      >
        <Icon className={cn(l.icon.normal())} name="trash" />
        Trash
      </button>
    );
  }, DefaultProps)
);
