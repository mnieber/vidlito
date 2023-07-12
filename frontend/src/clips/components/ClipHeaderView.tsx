import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { PlaylistFollowCard } from '/src/playlists/components/PlaylistFollowCard';
import { cn } from '/src/utils/classnames';
import { SwitchButton } from '/src/utils/components/SwitchButton';

// Import styles
import './ClipHeaderView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clips,
  ...dps.playlist,
  ...dps.dashboardState,
};

export const ClipHeaderView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.clips)) {
      return <ClipHeaderViewLoader className={props.className} />;
    }

    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist = noClips || props.dashboardState.showPlaylistView;

    return (
      <div
        className={cn(
          'ClipHeaderView',
          //
          //
          L.col.banner(),
          props.className
        )}
      >
        <div
          className={cn(
            'ClipHeaderView__Buttons',
            //
            //
            L.row.banner()
          )}
        >
          <SwitchButton
            state={showPlaylist ? 'left' : 'right'}
            hasRight={!!props.clip}
            onToggle={(state: 'left' | 'right') =>
              props.dashboardState.toggleShowPlaylistView(state === 'left')
            }
            textLeft={props.playlist.name}
            textRight={props.clip?.name}
          />
          <div className={cn('grow')} />
          <PlaylistFollowCard className={cn('ml-4')} />
        </div>
      </div>
    );
  }, DefaultProps)
);

export const ClipHeaderViewLoader = observer((props: { className?: any }) => {
  return (
    <div
      className={cn(
        'ClipHeaderViewLoader',
        'h-[50px]',
        'rounded bg-gray-300',
        props.className
      )}
    ></div>
  );
});
