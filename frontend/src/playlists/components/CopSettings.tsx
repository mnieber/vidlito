import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { EditButton } from '/src/clips/components/EditButton';
import { CardL } from '/src/frames/components/Card';
import { L } from '/src/frames/layout';
import { PlaylistSettingsFormView } from '/src/playlists/components/PlaylistSettingsFormView';
import { PlaylistSettingsView } from '/src/playlists/components/PlaylistSettingsView';
import { TagsCard } from '/src/playlists/components/TagsCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopSettings.scss';

export type PropsT = {
  showPlaylist: boolean;
  className?: any;
};

export const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
  ...dps.playlistSettingsEdit,
};

export const CopSettings = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const Stub = (...args: any[]) => null;
    const ClipSettingsView = Stub;
    const ClipSettingsFormView = Stub;
    const isPublic = props.showPlaylist
      ? props.playlist?.isPublic
      : props.clip?.nrOfPublicPlaylists;

    const status = isPublic ? 'Public' : 'Private';
    const title = props.showPlaylist ? 'Playlist settings' : 'Clip settings';
    // HACK: always use playlistSettingsEdit
    const edit = props.showPlaylist
      ? props.playlistSettingsEdit
      : props.playlistSettingsEdit;
    const editSettings = edit.isEditing;
    const SettingsView = props.showPlaylist
      ? PlaylistSettingsView
      : ClipSettingsView;
    const SettingsFormView = props.showPlaylist
      ? PlaylistSettingsFormView
      : ClipSettingsFormView;

    return (
      <div
        className={cn(
          'CopSettings',
          [],
          [CardL.size.medium(), props.className]
        )}
      >
        <div
          className={cn(
            'CopSettings__TopRow',
            [],
            [L.row.skewer(), 'grow', 'justify-between']
          )}
        >
          <div className={cn('CopSettings__Title', L.row.skewer())}>
            {title}
            <div className="ml-4" />
            <TagsCard
              clipTags={props.showPlaylist ? [] : [status]}
              playlistTags={props.showPlaylist ? [status] : []}
            />
          </div>
          <EditButton className="self-end" edit={edit} disabled={false} />
        </div>
        {!editSettings && <SettingsView className="" />}
        {editSettings && <SettingsFormView className="mt-4" />}
      </div>
    );
  }, DefaultProps)
);
