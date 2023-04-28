import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { ToolButton_ } from 'src/frames/components/ToolButton';
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
        className={cn('TrashButton', ToolButton_.root, props.className)}
        onClick={() => urlEvents.goToActions()}
      >
        <Icon className={cn(ToolButton_.icon.normal)} name="trash" />
        Trash
      </button>
    );
  }, DefaultProps)
);
