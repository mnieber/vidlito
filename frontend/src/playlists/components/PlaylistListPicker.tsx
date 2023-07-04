import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import {
  PlaylistListHeader,
  PlaylistListView,
} from '/src/playlists/components';
import { cn } from '/src/utils/classnames';

const separator = ['my-2', 'border-t border-gray-700'];

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
  ...dps.clips,
  ...dps.dashboardState,
};

export const PlaylistListPicker = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.playlists) || isLoading(props.clips)) {
      return <PlaylistListPickerLoader {...props} />;
    }

    return (
      <div
        className={cn(
          'PlaylistListPicker',
          //
          //
          L.col.banner(),
          props.className
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

export const PlaylistListPickerLoader = observer(
  (props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ClipListViewLoader', props.className)}>
        <div className={cn('Dashboard__Separator__', separator)} />
        <div
          className={cn(
            'ClipListViewLoader__Body',
            'h-3 my-4',
            'rounded bg-gray-300'
          )}
        ></div>
        <div className={cn('Dashboard__Separator__', separator)} />
      </div>
    );
  }
);
