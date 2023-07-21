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
  className?: any;
};

export const DefaultProps = {
  ...dps.playlist,
  ...dps.playlistSettingsEdit,
};

export const CopSettings = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const editSettings = props.playlistSettingsEdit.isEditing;
    const status = props.playlist?.isPublic ? 'Public' : 'Private';

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
            Playlist settings
            <div className="ml-4" />
            <TagsCard clipTags={[]} playlistTags={[status]} />
          </div>
          <EditButton
            className="self-end"
            edit={props.playlistSettingsEdit}
            disabled={false}
          />
        </div>
        {!editSettings && <PlaylistSettingsView className="" />}
        {editSettings && <PlaylistSettingsFormView className="mt-4" />}
      </div>
    );
  }, DefaultProps)
);
