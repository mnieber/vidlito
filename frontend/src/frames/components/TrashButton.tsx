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
  ...dps.userProfile,
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
        onClick={() => navToActions(props.userProfile.username)}
      >
        <Icon
          className={cn(l.icon.root(), l.icon.size.normal())}
          name="trash"
        />
        Trash
      </button>
    );
  }, DefaultProps)
);
