import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, colBanner, rowBanner, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
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
    return (
      <div className={cn('ClipHeaderView', rowBanner, props.className)}>
        {
          //
          // 🔳 Title
          //
        }
        <div
          className={cn(
            'ClipHeaderView__Title',
            'pt-2.5 pb-4 pr-4 pl-7',
            '',
            'rounded-l-[32px]',
            'text-gray-700',
            'border-2 border-blue-50',
            {
              'bg-blue-50': props.dashboardState.showPlaylistDescription,
            }
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
        <div
          className={cn(
            'ClipHeaderView__Title',
            'ml-[3px] pt-2.5 pb-4 pl-4 pr-7',
            '',
            'rounded-r-[32px]',
            'text-gray-700',
            'border-2 border-blue-50',
            {
              'bg-blue-50': !props.dashboardState.showPlaylistDescription,
            }
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
          //
          // 🔳 EditAndAuthor
          //
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
            //
            // 🔳 EditButton
            //
          }
          <button
            className={cn(
              'ClipHeaderView__EditButton',
              rowSkewer,
              'text-md font-bold tracking-wider'
            )}
            onClick={() => {
              const edit = props.dashboardState.showPlaylistDescription
                ? props.playlistsEdit
                : props.clipsEdit;
              edit.enable();
            }}
          >
            <Icon
              className={cn('h-[24px] w-[24px]', 'mr-2', 'p-1', 'bg-gray-700')}
              name="pencil"
            />
            Edit
          </button>
          <div className={cn('ClipHeaderView__TitleAuthor')}>
            By: {props.clip.owner.username}
          </div>
        </div>
      </div>
    );
  }, DefaultProps)
);
