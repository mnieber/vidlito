import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { cn, d } from 'src/utils/classnames';

// Import styles
import './PlaylistListHeader.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
  ...dps.dashboardState,
};

export const PlaylistListHeader = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!props.playlist) return null;

    const l = L.DropdownButton;

    return (
      <div
        className={cn(
          d('PlaylistListHeader'),
          l.root(),
          l.color.blue(),
          props.className
        )}
        onClick={() => props.dashboardState.toggleIsPlaylistListExpanded()}
      >
        <div className={cn(l.text())}>{props.playlist.name}</div>
        <Icon
          className={cn(l.icon())}
          name={
            props.dashboardState.isPlaylistListExpanded
              ? 'cheveron-down'
              : 'cheveron-right'
          }
        />
      </div>
    );
  }, DefaultProps)
);
