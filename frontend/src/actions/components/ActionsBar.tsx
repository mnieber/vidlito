import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { rowFlagPole, rowSkewer } from 'src/frames/components';
import { Icon } from 'src/frames/components/Icon';
import { lvi } from 'src/frames/components/Lvi';
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
      <div className={cn('ActionsBar', rowFlagPole, props.className)}>
        {
          // 🔳 Button all actions 🔳
        }
        <label
          className={cn('ActionsBar__AllActionsRadioBtn', 'mr-4', rowSkewer)}
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
          className={cn('ActionsBar__PlaylistActionsRadioBtn', rowSkewer)}
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
            className={cn('ActionsBar__UndoActionButton', rowSkewer, {
              invisible: !props.action,
            })}
            onClick={() => props.actionsState.undoAction(props.action)}
          >
            <Icon className={cn(lvi.leadingIcon)} name="reply" />
            Undo
          </button>
        </div>
      </div>
    );
  }, DefaultProps)
);
