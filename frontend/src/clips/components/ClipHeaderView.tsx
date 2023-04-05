import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipTagsView } from 'src/clips/components/ClipTagsView';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
import { colBanner } from 'src/frames/components/Banner';
import { lvi } from 'src/frames/components/Lvi';
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
      <div className={cn('ClipHeaderView', colBanner, props.className)}>
        {/*             */}
        {/* 🟩 Title 🟩 */}
        {/*             */}
        <div className={cn('ClipHeaderView__Title', 'mb-2')}>
          <div className={cn('ClipHeaderView__TitleName', 'mb-2', rowSkewer)}>
            <button
              className={cn('ClipHeaderView__PlaylistName', {
                underline: props.dashboardState.showPlaylistDescription,
              })}
              onClick={() => {
                props.dashboardState.toggleShowPlaylistDescription(true);
              }}
            >
              {props.playlist.name}
            </button>
            <button
              className={cn('ClipHeaderView__ClipName', 'ml-2', {
                underline: !props.dashboardState.showPlaylistDescription,
              })}
              onClick={() => {
                props.dashboardState.toggleShowPlaylistDescription(false);
              }}
            >
              {props.clip.name}
            </button>
            {/*                  */}
            {/* 🟩 EditButton 🟩 */}
            {/*                  */}
            <button
              className={cn('ClipHeaderView__EditButton', mainButton, 'ml-2')}
              onClick={() => {
                const edit = props.dashboardState.showPlaylistDescription
                  ? props.playlistsEdit
                  : props.clipsEdit;
                edit.enable();
              }}
            >
              <Icon className={cn(lvi.leadingIcon)} name="pencil" />
              Edit
            </button>
          </div>
          <div className={cn('ClipHeaderView__TitleAuthor')}>
            By: {props.clip.owner.username}
          </div>
          <ClipTagsView />
        </div>
      </div>
    );
  }, DefaultProps)
);
