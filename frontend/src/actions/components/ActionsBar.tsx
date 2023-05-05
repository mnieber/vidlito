import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components/Icon';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';

// Import styles
import './ActionsBar.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.action,
  ...dps.actionsState,
};

export const ActionsBar = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      //
      // 🔳 ActionsBar 🔳
      //
      <div className={cn('ActionsBar', L.row.flagPole(), props.className)}>
        {
          // 🔳 Button all actions 🔳
        }
        <label
          className={cn(
            'ActionsBar__AllActionsRadioBtn',
            'mr-4',
            L.row.skewer()
          )}
          onClick={() => {
            props.actionsState.settings.setShowAllActions(true);
          }}
        >
          <Icon
            className={cn('mr-1')}
            name={
              props.actionsState.settings.showAllActions
                ? 'radioButtonOn'
                : 'radioButtonOff'
            }
          />
          All actions
        </label>
        {
          // 🔳 Button playlist actions 🔳
        }
        <label
          className={cn('ActionsBar__PlaylistActionsRadioBtn', L.row.skewer())}
          onClick={() => {
            props.actionsState.settings.setShowAllActions(false);
          }}
        >
          <Icon
            className={cn('mr-1')}
            name={
              !props.actionsState.settings.showAllActions
                ? 'radioButtonOn'
                : 'radioButtonOff'
            }
          />
          Playlist actions
        </label>
        {
          // 🔳 Undo Button 🔳
        }
        <div className={cn('ml-auto')}>
          <button
            className={cn(
              'ActionsBar__UndoActionButton',
              L.DialogButton.root(),
              L.DialogButton.color.darkBlueOnSkyBlue(),
              {
                invisible: !props.action,
              }
            )}
            onClick={() => props.actionsState.undoAction(props.action)}
          >
            <Icon className={cn(L.DialogButton.icon())} name="reply" />
            Undo
          </button>
        </div>
      </div>
    );
  }, DefaultProps)
);
