import { observer } from 'mobx-react-lite';
import { navToActions, navToPlaylistActions } from '/src/actions/navFunctions';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ToolButton } from '/src/frames/components/ToolButton';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const TrashButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <ToolButton
        className={cn('TrashButton', props.className)}
        iconName="search"
        label="Trash"
        onClick={() =>
          props.playlist
            ? navToPlaylistActions(props.playlist.slug)
            : navToActions()
        }
      />
    );
  }, DefaultProps)
);
