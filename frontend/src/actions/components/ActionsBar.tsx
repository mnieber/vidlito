import { observer } from 'mobx-react-lite';
import { ActionsUIEventsT } from 'src/actions/ActionsUIEvents';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { rowBanner } from 'src/frames/components';
import { Icon } from 'src/frames/components/Icon';
import { lvi } from 'src/frames/components/Lvi';
import { useUIEventHandler } from 'src/uiEvents';
import { cn } from 'src/utils/classnames';
import './ActionsBar.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.actionsState,
};

export const ActionsBar = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const uiEvents = useUIEventHandler<ActionsUIEventsT>();

    return (
      <div className={cn('ActionsBar', rowBanner, props.className)}>
        <label className={cn('mr-2')}>
          <input
            className={cn('uk-radio', '!mr-2')}
            type="radio"
            onChange={() => {
              props.actionsState.settings.setShowAllActions(true);
            }}
            checked={!!props.actionsState.settings.showAllActions}
          />
          All actions
        </label>
        <label>
          <input
            className={cn('uk-radio', '!mr-2')}
            type="radio"
            onChange={() => {
              props.actionsState.settings.setShowAllActions(false);
            }}
            checked={!props.actionsState.settings.showAllActions}
          />
          Playlist actions
        </label>
        <div className={cn('ml-auto')}>
          <button onClick={() => uiEvents.closeActions()}>
            <Icon className={cn(lvi.leadingIcon)} name="close" />
          </button>
        </div>
      </div>
    );
  }, DefaultProps)
);
