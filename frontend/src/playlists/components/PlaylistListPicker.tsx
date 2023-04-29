import { observer } from 'mobx-react-lite';
import { isLoading } from 'src/api/getState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { colBanner } from 'src/frames/components';
import { PlaylistListHeader, PlaylistListView } from 'src/playlists/components';
import { cn, d } from 'src/utils/classnames';

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
      <div className={cn('PlaylistListPicker', colBanner)}>
        <div className={cn(d('Dashboard__Separator'), separator)} />
        <PlaylistListHeader />
        <PlaylistListView
          className={cn('overflow-y-auto')}
          isExpanded={props.dashboardState.isPlaylistListExpanded}
        />
        <div className={cn(d('Dashboard__Separator'), separator)} />
      </div>
    );
  }, DefaultProps)
);
