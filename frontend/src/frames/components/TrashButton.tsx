import { observer } from 'mobx-react-lite';
import { navToActions } from '/src/actions/ActionsNavEvents';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const TrashButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
        onClick={() => navToActions()}
      >
        <Icon className={cn(l.icon.normal())} name="trash" />
        Trash
      </button>
    );
  }, DefaultProps)
);
