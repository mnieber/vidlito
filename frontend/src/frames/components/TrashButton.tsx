import { observer } from 'mobx-react-lite';
import { navToActions } from '/src/actions/ActionsNavEvents';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ToolButton } from '/src/frames/components/ToolButton';
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
      <ToolButton
        className={cn('TrashButton', props.className)}
        iconName="search"
        label="Trash"
        onClick={() => navToActions(props.userProfile.username)}
      />
    );
  }, DefaultProps)
);
