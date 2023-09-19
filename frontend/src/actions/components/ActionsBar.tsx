import { observer } from 'mobx-react-lite';
import { useNavContext } from 'react-nav-handler';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/navFunctions';
import { CloseButton } from '/src/frames/components/CloseButton';
import {
  BlueDialogButtonTrim,
  DialogButton,
} from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import { navToPlaylist } from '/src/playlists/navFunctions';
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
  ...dps.actionsUndo,
  ...dps.playlist,
  ...dps.clip,
};

export const ActionsBar = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const navContext = useNavContext('ActionsBar');

    return (
      /*
      🔳 ActionsBar 🔳
      */
      <div className={cn('ActionsBar', [L.row.flagPole(), props.className])}>
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
          className={cn(
            ['ActionsBar__UndoActionButton', { invisible: !props.action }],
            ['mx-4']
          )}
          trim={BlueDialogButtonTrim}
          iconName="reply"
          label="Undo"
          onClick={() => props.actionsUndo.undo({ action: props.action })}
        />

        {
          // 🔳 Close Button 🔳
        }
        <CloseButton
          onClick={() => {
            if (props.clip) {
              navToClip(navContext)(
                props.playlist.ownerUsername,
                props.playlist.slug,
                props.clip.slug
              ).go();
            } else {
              navToPlaylist(navContext)(
                props.playlist.ownerUsername,
                props.playlist.slug
              ).go();
            }
          }}
          className={cn({
            invisible: !props.playlist,
          })}
        />
      </div>
    );
  }, DefaultProps)
);
