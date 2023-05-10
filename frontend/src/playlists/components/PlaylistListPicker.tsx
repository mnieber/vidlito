import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import {
  PlaylistListHeader,
  PlaylistListView,
} from '/src/playlists/components';
import { cn } from '/src/utils/classnames';

export type PropsT = {};

const DefaultProps = {
  ...dps.playlists,
  ...dps.dashboardState,
};

export const PlaylistListPicker = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.playlists)) {
      return null;
    }

    const separator = ['my-2', 'border-t border-gray-700'];

    return (
      <div
        className={cn(
          'PlaylistListPicker',
          //
          //
          L.col.banner()
        )}
      >
        <div className={cn('Dashboard__Separator__', separator)} />
        <PlaylistListHeader />
        <PlaylistListView
          className={cn('overflow-y-auto')}
          isExpanded={props.dashboardState.isPlaylistListExpanded}
        />
        <div className={cn('Dashboard__Separator__', separator)} />
      </div>
    );
  }, DefaultProps)
);
