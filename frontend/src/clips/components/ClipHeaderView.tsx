import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
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
    if (!props.clip) {
      return <ClipHeaderViewLoader {...props} />;
    }

    const isOwnerClip = props.clip.owner.username === props.username;
    const isOwnerPlaylist = props.playlist.owner.username === props.username;
    const isOwner = props.dashboardState.showPlaylistDescription
      ? isOwnerPlaylist
      : isOwnerClip;

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
        <div
          className={cn(
            'ClipHeaderView__PlaylistButton',
            {
              'ClipHeaderView__PlaylistButton--active':
                props.dashboardState.showPlaylistDescription,
            },
            //
            //
            'pt-2.5 pb-3 pr-4 pl-7'
          )}
        >
          <div
            className={cn(
              'ClipHeaderView__TitleName',
              //
              //
              L.row.skewer()
            )}
          >
            <button
              className={cn('ClipHeaderView__PlaylistName')}
              onClick={() => {
                props.dashboardState.toggleShowPlaylistDescription(true);
              }}
            >
              {props.playlist.name}
            </button>
          </div>
        </div>
        {
          // 🔳 Clip button 🔳
        }
        <div
          className={cn(
            'ClipHeaderView__ClipButton',
            {
              'ClipHeaderView__ClipButton--active':
                !props.dashboardState.showPlaylistDescription,
            },
            //
            //
            'ml-[3px] pt-2.5 pb-3 pl-4 pr-7'
          )}
        >
          <div
            className={cn(
              'ClipHeaderView__TitleName',
              //
              //
              L.row.skewer()
            )}
          >
            <button
              className={cn('ClipHeaderView__ClipName')}
              onClick={() => {
                props.dashboardState.toggleShowPlaylistDescription(false);
              }}
            >
              {props.clip.name}
            </button>
          </div>
        </div>
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
              const edit = props.dashboardState.showPlaylistDescription
                ? props.playlistsEdit
                : props.clipsEdit;
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
            By: {textTrunc(props.clip.owner.username, 24)}
          </div>
        </div>
      </div>
    );
  }, DefaultProps)
);

export const ClipHeaderViewLoader = observer(
  (props: PropsT & typeof DefaultProps) => {
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
  }
);
