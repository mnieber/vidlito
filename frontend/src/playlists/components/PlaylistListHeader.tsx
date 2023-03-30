import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, rowBanner } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
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
        className={cn('PlaylistListHeader', rowBanner, props.className)}
        onClick={() => props.dashboardState.toggleIsPlaylistListExpanded()}
      >
        {props.playlist.name}
        <Icon name="plus" />
      </div>
    );
  }, DefaultProps)
);
