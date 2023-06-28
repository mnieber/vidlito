import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipEditButton } from '/src/clips/components/ClipEditButton';
import { L } from '/src/frames/layout';
import { AuthorCard } from '/src/playlists/components/AuthorCard';
import { PlaylistFollowCard } from '/src/playlists/components/PlaylistFollowCard';
import { cn } from '/src/utils/classnames';

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
    const noClips = !props.clips.length && !isLoading(props.clips);

    if ((!props.clip && !noClips) || !props.playlist) {
      return <ClipHeaderViewLoader className={props.className} />;
    }

    const showPlaylist =
      noClips || props.dashboardState.showPlaylistDescription;

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
          {
            // 🔳 Playlist button 🔳
          }
          <button
            className={cn(
              'ClipHeaderView__PlaylistButton',
              {
                'ClipHeaderView__PlaylistButton--active': showPlaylist,
                'rounded-r-[32px] pr-7': noClips,
              },
              //
              //
              L.row.skewer(),
              'pt-2.5 pb-3 pr-4 pl-7'
            )}
            onClick={() => {
              props.dashboardState.toggleShowPlaylistDescription(true);
            }}
          >
            {props.playlist.name}
          </button>
          {
            // 🔳 Clip button 🔳
          }
          {props.clip && (
            <button
              className={cn(
                'ClipHeaderView__ClipButton',
                {
                  'ClipHeaderView__ClipButton--active': !showPlaylist,
                },
                //
                //
                L.row.skewer(),
                'ml-[3px] pt-2.5 pb-3 pl-4 pr-7'
              )}
              onClick={() => {
                props.dashboardState.toggleShowPlaylistDescription(false);
              }}
            >
              {props.clip.name}
            </button>
          )}
          <div className={cn('grow')} />
          <PlaylistFollowCard />
        </div>
        <div className={cn(L.row.skewer(), 'grow', 'justify-between')}>
          <AuthorCard className="self-end mt-3" />
          <ClipEditButton showPlaylist={showPlaylist} />
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
        'h-[50px] my-4',
        'rounded bg-gray-300',
        props.className
      )}
    ></div>
  );
});
