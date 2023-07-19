import { observer } from 'mobx-react-lite';
import { navToActions } from '/src/actions/ActionsNavEvents';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { ToolButtonL } from '/src/frames/components/ToolButton';
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
    return (
      <button
        className={cn('TrashButton', [], [ToolButtonL.root(), props.className])}
        onClick={() => navToActions(props.userProfile.username)}
      >
        <Icon
          className={cn(
            ToolButtonL.icon.root(),
            ToolButtonL.icon.size.normal()
          )}
          name="trash"
        />
        Trash
      </button>
    );
  }, DefaultProps)
);
