import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipDescription } from '/src/clips/components/ClipDescription';
import { ClipFormView } from '/src/clips/components/ClipFormView';
import { EditButton } from '/src/clips/components/EditButton';
import { CardL } from '/src/frames/components/Card';
import { L } from '/src/frames/layout';
import {
  PlaylistDescription,
  PlaylistFormView,
} from '/src/playlists/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopDescription.scss';

export type PropsT = {
  showPlaylist: boolean;
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
  ...dps.isOwner,
  ...dps.clipsEdit,
  ...dps.clipPdEdit,
  ...dps.playlistsEdit,
  ...dps.playlistPdEdit,
  ...dps.userProfile,
};

export const CopDescription = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const cop = props.showPlaylist ? props.playlist : props.clip;
    const edit = props.showPlaylist ? props.playlistsEdit : props.clipsEdit;
    const View = props.showPlaylist ? PlaylistDescription : ClipDescription;
    const FormView = props.showPlaylist ? PlaylistFormView : ClipFormView;

    return (
      <div
        className={cn(
          'CopDescription',
          [],
          [CardL.size.medium(), props.className]
        )}
      >
        <div
          className={cn(
            'CopDescription__TopRow',
            L.row.skewer(),
            'grow',
            'justify-between'
          )}
        >
          <div className={cn('CopDescription__Title')}>Description</div>
          {props.userProfile && (
            <EditButton
              className="self-end"
              edit={edit}
              disabled={cop && !props.isOwner(cop)}
            />
          )}
        </div>
        {!edit.isEditing && <View className="mt-4" />}
        {edit.isEditing && <FormView className="mt-4" />}
      </div>
    );
  }, DefaultProps)
);
