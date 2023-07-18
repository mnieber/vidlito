import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { DropdownButtonL } from '/src/frames/components/DropdownButton';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistListHeader.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
  ...dps.dashboardState,
};

export const PlaylistListHeader = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!props.playlists.length) return null;

    const playlist = props.playlist ?? R.head(props.playlists);

    return (
      <div
        className={cn(
          'PlaylistListHeader',
          [],
          [
            DropdownButtonL.root(),
            DropdownButtonL.color.blue(),
            props.className,
          ]
        )}
        onClick={() => props.dashboardState.toggleIsPlaylistListExpanded()}
      >
        <div className={cn(DropdownButtonL.text())}>{playlist.name}</div>
        <Icon
          className={cn(DropdownButtonL.icon())}
          name={
            props.dashboardState.isPlaylistListExpanded
              ? 'cheveronDown'
              : 'cheveronRight'
          }
        />
      </div>
    );
  }, DefaultProps)
);
