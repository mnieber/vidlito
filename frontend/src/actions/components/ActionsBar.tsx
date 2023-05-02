import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { rowBanner, rowSkewer } from 'src/frames/components';
import { Icon } from 'src/frames/components/Icon';
import { lvi } from 'src/frames/components/Lvi';
import { ActionsUrlEvents, useUrlEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';

// Import styles
import './ActionsBar.scss';

const useUrlEvents = () => useUrlEventHandler<typeof ActionsUrlEvents>();

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.actionsState,
};

export const ActionsBar = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEvents();

    return (
      <div className={cn('ActionsBar', rowBanner, props.className)}>
        <label
          className={cn('mr-4', rowSkewer)}
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
        <label
          className={cn(rowSkewer)}
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
        <div className={cn('ml-auto')}>
          <button onClick={() => urlEvents.closeActions()}>
            <Icon className={cn(lvi.leadingIcon)} name="close" />
          </button>
        </div>
      </div>
    );
  }, DefaultProps)
);
