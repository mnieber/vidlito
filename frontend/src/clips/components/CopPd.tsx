import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipPdView } from '/src/clips/components';
import { ClipPdFormView } from '/src/clips/components/ClipPdFormView';
import { EditButton } from '/src/clips/components/EditButton';
import { CardL } from '/src/frames/components/Card';
import { L } from '/src/frames/layout';
import { PlaylistPdView } from '/src/playlists/components';
import { PlaylistPdFormView } from '/src/playlists/components/PlaylistPdFormView';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopPd.scss';

export type PropsT = {
  showPlaylist: boolean;
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
  ...dps.clipPdEdit,
  ...dps.playlistPdEdit,
  ...dps.userProfile,
};

export const CopPd = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const View = props.showPlaylist ? PlaylistPdView : ClipPdView;
    const FormView = props.showPlaylist ? PlaylistPdFormView : ClipPdFormView;
    const edit = props.showPlaylist ? props.playlistPdEdit : props.clipPdEdit;

    return (
      <div className={cn('CopPd', [], [CardL.size.medium(), props.className])}>
        <div
          className={cn(
            'CopPd__TopRow',
            L.row.skewer(),
            'grow',
            'justify-between'
          )}
        >
          <div className={cn('CopPd__Title')}>
            {`${props.showPlaylist ? 'Playlist' : 'Clip'} private data`}
          </div>
          <EditButton
            className="self-end"
            edit={edit}
            disabled={!props.userProfile}
          />
        </div>
        {!edit.isEditing && <View className="mt-4" />}
        {edit.isEditing && <FormView className="mt-4" />}
      </div>
    );
  }, DefaultProps)
);
