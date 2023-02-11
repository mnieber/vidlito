import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
import { TogglePlaylistDescription } from 'src/playlists/components';
import { cn } from 'src/utils/classnames';
import './ClipHeaderView.scss';

export type PropsT = {
  togglePlaylistDescription: () => void;
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEditing,
  ...dps.playlist,
};

export const ClipHeaderView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ClipHeaderView', rowSkewer, props.className)}>
        {/*             */}
        {/* 🟩 Title 🟩 */}
        {/*             */}
        <div className={cn('ClipHeaderView__Title')}>
          <div className={cn('ClipHeaderView__TitleName', rowSkewer)}>
            <TogglePlaylistDescription
              togglePlaylistDescription={props.togglePlaylistDescription}
            />
            <div className={cn('ClipHeaderView__PlaylistName')}>
              {props.playlist.name}
            </div>
            <div className={cn('ClipHeaderView__ClipName', 'ml-2')}>
              {props.clip.name}
            </div>
            {/*                  */}
            {/* 🟩 EditButton 🟩 */}
            {/*                  */}
            <button
              className={cn('ClipHeaderView__EditButton', mainButton, 'ml-2')}
              onClick={() => props.clipsEditing.enable()}
            >
              <Icon name="pencil" />
              Edit
            </button>
          </div>
          <div className={cn('ClipHeaderView__TitleAuthor')}>
            By: {props.playlist.owner.displayName}
          </div>
        </div>
      </div>
    );
  }, DefaultProps)
);
