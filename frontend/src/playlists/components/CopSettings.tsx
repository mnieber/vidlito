import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { EditButton } from '/src/clips/components/EditButton';
import { CardL } from '/src/frames/components/Card';
import { L } from '/src/frames/layout';
import { PlaylistSettingsFormView } from '/src/playlists/components/PlaylistSettingsFormView';
import { PlaylistSettingsView } from '/src/playlists/components/PlaylistSettingsView';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopSettings.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.playlistSettingsEdit,
};

export const CopSettings = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const editSettings = props.playlistSettingsEdit.isEditing;

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
          <div className={cn('CopSettings__Title')}>Playlist settings</div>
          <EditButton
            className="self-end"
            edit={props.playlistSettingsEdit}
            enabled={true}
          />
        </div>
        {!editSettings && <PlaylistSettingsView className="mt-4" />}
        {editSettings && <PlaylistSettingsFormView className="mt-4" />}
      </div>
    );
  }, DefaultProps)
);
