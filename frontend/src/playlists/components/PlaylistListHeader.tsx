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

    return (
      <div
        className={cn('PlaylistListHeader', [
          L.row.skewer(),
          'justify-between',
          props.className,
        ])}
        onClick={() =>
          props.dashboardState.panelState.toggleIsPlaylistListExpanded()
        }
      >
        <div className={cn()}>{playlist.name}</div>
        <Icon
          className={cn('h-[30px]', 'w-[30px]', 'fill-gray-text')}
          name={
            props.dashboardState.panelState.isPlaylistListExpanded
              ? 'cheveronDown'
              : 'cheveronRight'
          }
        />
      </div>
    );
  }, DefaultProps)
);
