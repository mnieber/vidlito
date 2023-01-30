import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { EditableClipView } from 'src/clips/components';
import { PlaylistFormView } from 'src/playlists/components';
import { cn } from 'src/utils/classnames';
import './MainView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlistsEditing,
};

export const MainView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('MainView', props.className)}>
        <></>
        {/* Switch */}
        <></>
        {props.playlistsEditing.isEditing && <PlaylistFormView />}
        {!props.playlistsEditing.isEditing && <EditableClipView />}
      </div>
    );
  }, DefaultProps)
);
