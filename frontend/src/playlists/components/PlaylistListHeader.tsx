import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { dropDownButton } from 'src/frames/components/DropDownButton';
import { cn, d } from 'src/utils/classnames';
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

    return (
      <div
        className={cn(
          d('PlaylistListHeader'),
          dropDownButton.container,
          'font-bold text-primaryBlue',
          props.className
        )}
        onClick={() => props.dashboardState.toggleIsPlaylistListExpanded()}
      >
        <div className={cn(dropDownButton.text)}>{props.playlist.name}</div>
        <Icon
          className={cn(dropDownButton.icon, 'fill-gray-700')}
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
