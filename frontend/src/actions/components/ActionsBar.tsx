import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { actionsCtx } from '/src/actions/hooks/useActionsContext';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardNav } from '/src/dashboard/routes';
import { CloseButton } from '/src/frames/components/CloseButton';
import {
  BlueDialogButtonTrim,
  DialogButton,
} from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { navTo } from '/src/routes/navHandler';
import { cn } from '/src/utils/classnames';
import { SwitchButton } from '/src/utils/components/SwitchButton';

// Import styles
import './ActionsBar.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  action: actionsCtx.action,
  actionsState: actionsCtx.actionsState,
  actionsUndo: actionsCtx.actionsUndo,
  playlist: playlistsCtx.playlist,
  clip: clipsCtx.clip,
};

export const ActionsBar = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
              navTo(
                dashboardNav.clip({
                  ownerUsername: props.playlist.ownerUsername,
                  playlistSlug: props.playlist.slug,
                  clipSlug: props.clip.slug,
                })
              );
            } else {
              navTo(
                dashboardNav.playlist({
                  ownerUsername: props.playlist.ownerUsername,
                  playlistSlug: props.playlist.slug,
                })
              );
            }
          }}
          className={cn({
            invisible: !props.playlist,
          })}
        />
      </div>
    );
  }, ContextProps)
);
