import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipEditButton.scss';

export type PropsT = {
  showPlaylist: boolean;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEdit,
  ...dps.playlistsEdit,
  ...dps.playlist,
  ...dps.username,
  ...dps.dashboardState,
};

export const ClipEditButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const isOwnerClip = props.clip?.owner.username === props.username;
    const isOwnerPlaylist = props.playlist.owner.username === props.username;
    const isOwner = props.showPlaylist ? isOwnerPlaylist : isOwnerClip;

    return (
      //
      // 🔳 EditButton 🔳
      //
      <button
        className={cn(
          'ClipEditButton',
          {
            'ClipEditButton--disabled': !isOwner,
            'ClipEditButton--invisible': R.isNil(props.username),
          },
          //
          //
          L.ToolButton.root()
        )}
        disabled={!isOwner}
        onClick={() => {
          const edit = props.showPlaylist
            ? props.playlistsEdit
            : props.clipsEdit;
          edit.enable();
        }}
      >
        <Icon
          className={cn('ClipEditButton__Icon', L.ToolButton.icon.small(), {
            'ClipEditButton__Icon--disabled': !isOwner,
          })}
          name="pencil"
        />
        Edit
      </button>
    );
  }, DefaultProps)
);
