import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { CloseButton } from '/src/frames/components/CloseButton';
import { DialogButton } from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { cn } from '/src/utils/classnames';
import { SwitchButton } from '/src/utils/components/SwitchButton';

// Import styles
import './ActionsBar.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.action,
  ...dps.actionsState,
  ...dps.playlist,
  ...dps.clip,
};

export const ActionsBar = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      /*
      🔳 ActionsBar 🔳
      */
      <div
        className={cn('ActionsBar', [], [L.row.flagPole(), props.className])}
      >
        {
          // 🔳 Switch button 🔳
        }
        <SwitchButton
          className="mb-4"
          state={props.actionsState.settings.showAllActions ? 'left' : 'right'}
          onToggle={(state: 'left' | 'right') =>
            props.actionsState.settings.setShowAllActions(state === 'left')
          }
          textLeft={'All actions'}
          textRight={'Playlist actions'}
        />

        {
          // 🔳 Spacer 🔳
        }
        <div className="flex-grow" />

        {
          // 🔳 Undo action Button 🔳
        }
        <DialogButton
          className={cn([
            'ActionsBar__UndoActionButton',
            'mx-4',
            {
              invisible: !props.action,
            },
          ])}
          iconName="reply"
          label="Undo"
          color="blue"
          onClick={() => props.actionsState.undoAction(props.action)}
        />

        {
          // 🔳 Close Button 🔳
        }
        <CloseButton
          onClick={() => {
            if (props.clip) {
              navToClip(
                props.playlist.ownerUsername,
                props.playlist.slug,
                props.clip.slug
              );
            } else {
              navToPlaylist(props.playlist.ownerUsername, props.playlist.slug);
            }
          }}
          className={cn('', {
            invisible: !props.playlist,
          })}
        />
      </div>
    );
  }, DefaultProps)
);
