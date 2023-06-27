import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { textTrunc } from '/src/utils/strings';

// Import styles
import './ClipHeaderView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEdit,
  ...dps.playlistsEdit,
  ...dps.playlist,
  ...dps.dashboardState,
  ...dps.username,
};

export const ClipHeaderView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const noClip = !props.clip && !isLoading(props.clip);

    if ((!props.clip && !noClip) || !props.playlist) {
      return <ClipHeaderViewLoader className={props.className} />;
    }

    const owner = props.clip?.owner ?? props.playlist.owner;
    const showPlaylist = noClip || props.dashboardState.showPlaylistDescription;
    const isOwnerClip = props.clip?.owner.username === props.username;
    const isOwnerPlaylist = props.playlist.owner.username === props.username;
    const isOwner = showPlaylist ? isOwnerPlaylist : isOwnerClip;

    return (
      <div
        className={cn(
          'ClipHeaderView',
          //
          //
          L.row.banner(),
          props.className
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
              'rounded-r-[32px] pr-7': noClip,
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
        {
          // 🔳 Rhs: the edit button and author 🔳
        }
        <div
          className={cn(
            'text-gray-700',
            //
            //
            L.col.banner(),
            'justify-between',
            'ml-8'
          )}
        >
          {
            // 🔳 EditButton 🔳
          }
          <button
            className={cn(
              'ClipHeaderView__EditButton',
              {
                'ClipHeaderView__EditButton--disabled': !isOwner,
                'ClipHeaderView__EditButton--invisible': R.isNil(
                  props.username
                ),
              },
              //
              //
              L.ToolButton.root()
            )}
            disabled={!isOwner}
            onClick={() => {
              const edit = showPlaylist ? props.playlistsEdit : props.clipsEdit;
              edit.enable();
            }}
          >
            <Icon
              className={cn(
                'ClipHeaderView__EditButtonIcon',
                L.ToolButton.icon.small(),
                {
                  'ClipHeaderView__EditButtonIcon--disabled': !isOwner,
                }
              )}
              name="pencil"
            />
            Edit
          </button>
          {
            // 🔳 Author 🔳
          }
          <div className={cn('ClipHeaderView__TitleAuthor')}>
            By: {textTrunc(owner.username, 24)}
          </div>
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
