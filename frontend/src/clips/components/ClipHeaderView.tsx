import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

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
};

export const ClipHeaderView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!props.clip) {
      return null;
    }

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
              //
              //
              L.ToolButton.root()
            )}
            onClick={() => {
              const edit = props.dashboardState.showPlaylistDescription
                ? props.playlistsEdit
                : props.clipsEdit;
              edit.enable();
            }}
          >
            <Icon className={L.ToolButton.icon.small()} name="pencil" />
            Edit
          </button>
          {
            // 🔳 Author 🔳
          }
          <div className={cn('ClipHeaderView__TitleAuthor')}>
            By: {props.clip.owner.username}
          </div>
        </div>
      </div>
    );
  }, DefaultProps)
);
