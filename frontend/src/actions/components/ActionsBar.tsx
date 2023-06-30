import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
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
          state={props.actionsState.settings.showAllActions ? 'left' : 'right'}
          onToggle={(state: 'left' | 'right') =>
            props.actionsState.settings.setShowAllActions(state === 'left')
          }
          textLeft={'All actions'}
          textRight={'Playlist actions'}
        />
        {
          // 🔳 Undo Button 🔳
        }
        <div className={cn('ml-auto')}>
          <button
            className={cn(
              'ActionsBar__UndoActionButton',
              //
              //
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
        </div>
      </div>
    );
  }, DefaultProps)
);
