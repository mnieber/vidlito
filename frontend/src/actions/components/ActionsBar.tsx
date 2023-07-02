import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { Icon } from '/src/frames/components/Icon';
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
  ...dps.userProfile,
};

export const ActionsBar = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      //
      // 🔳 ActionsBar 🔳
      //
      <div
        className={cn(
          'ActionsBar',
          //
          //
          L.row.flagPole(),
          props.className
        )}
      >
        <SwitchButton
          className="mb-4"
          state={props.actionsState.settings.showAllActions ? 'left' : 'right'}
          onToggle={(state: 'left' | 'right') =>
            props.actionsState.settings.setShowAllActions(state === 'left')
          }
          textLeft={'All actions'}
          textRight={'Playlist actions'}
        />
        <div className="flex-grow" />
        {
          // 🔳 Undo Button 🔳
        }
        <button
          className={cn(
            'ActionsBar__UndoActionButton',
            //
            //
            'mx-4',
            L.DialogButton.root(),
            L.DialogButton.color.darkBlueOnSkyBlue(),
            {
              invisible: !props.action,
            }
          )}
          onClick={() => props.actionsState.undoAction(props.action)}
        >
          <Icon className={cn(L.DialogButton.icon.root())} name="reply" />
          Undo
        </button>
        {
          // 🔳 Close Button 🔳
        }
        <button
          className={cn(
            'ActionsBar__CloseActionButton',
            //
            //
            L.DialogButton.root(),
            L.DialogButton.color.skyBlueTextAndBorder(),
            {
              invisible: !props.playlist,
            }
          )}
          onClick={() => {
            if (props.clip) {
              navToClip(props.playlist, props.clip.slug, props.userProfile);
            } else {
              navToPlaylist(props.playlist);
            }
          }}
        >
          <Icon
            className={cn(
              L.DialogButton.icon.root(),
              L.DialogButton.icon.color.skyBlue()
            )}
            name="close"
          />
          Close
        </button>
      </div>
    );
  }, DefaultProps)
);
