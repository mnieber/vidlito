import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, colBanner, rowBanner, rowSkewer } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';

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
      <div className={cn('ClipHeaderView', rowBanner, props.className)}>
        {
          // 🔳 Playlist button 🔳
        }
        <div
          className={cn(
            'ClipHeaderView__Title',
            'py-3 pr-4 pl-7',
            '',
            clipHeaderButton({
              isPlaylist: true,
              isActive: props.dashboardState.showPlaylistDescription,
            })
          )}
        >
          <div className={cn('ClipHeaderView__TitleName', rowSkewer)}>
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
            'ClipHeaderView__Title',
            'ml-[3px] pt-2.5 pb-4 pl-4 pr-7',
            '',
            clipHeaderButton({
              isPlaylist: false,
              isActive: !props.dashboardState.showPlaylistDescription,
            })
          )}
        >
          <div className={cn('ClipHeaderView__TitleName', rowSkewer)}>
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
            colBanner,
            'justify-between',
            'ml-8',
            '',
            'text-gray-700'
          )}
        >
          {
            // 🔳 EditButton 🔳
          }
          <button
            className={cn('ClipHeaderView__EditButton', L.ToolButton.root)}
            onClick={() => {
              const edit = props.dashboardState.showPlaylistDescription
                ? props.playlistsEdit
                : props.clipsEdit;
              edit.enable();
            }}
          >
            <Icon className={L.ToolButton.icon.small} name="pencil" />
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

const clipHeaderButton = ({
  isPlaylist,
  isActive,
}: {
  isPlaylist: boolean;
  isActive: boolean;
}) => {
  return [
    isPlaylist ? 'rounded-l-[32px]' : 'rounded-r-[32px]',
    'text-gray-700',
    'border-2 border-blue-50',
    {
      'bg-blue-50': isActive,
    },
  ];
};
