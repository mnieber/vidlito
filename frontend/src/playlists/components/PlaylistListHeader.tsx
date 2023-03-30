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
          [d('PlaylistListHeader'), dropDownButton.container],
          props.className
        )}
        onClick={() => props.dashboardState.toggleIsPlaylistListExpanded()}
      >
        {props.playlist.name}
        <Icon
          ratio={1.5}
          name={
            props.dashboardState.isPlaylistListExpanded
              ? 'triangle-down'
              : 'triangle-right'
          }
        />
      </div>
    );
  }, DefaultProps)
);
