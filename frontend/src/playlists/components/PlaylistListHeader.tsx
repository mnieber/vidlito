import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
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
    const l = L.DropdownButton;

    return (
      <div
        className={cn(
          'PlaylistListHeader',
          //
          //
          l.root(),
          l.color.blue(),
          props.className
        )}
        onClick={() => props.dashboardState.toggleIsPlaylistListExpanded()}
      >
        <div className={cn(l.text())}>{playlist.name}</div>
        <Icon
          className={cn(l.icon())}
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
