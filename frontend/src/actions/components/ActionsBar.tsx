import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { rowBanner } from 'src/frames/components';
import { Icon } from 'src/frames/components/Icon';
import { lvi } from 'src/frames/components/Lvi';
import { ActionsPageEventsT, usePageEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import './ActionsBar.scss';

export type PageEventsT = ActionsPageEventsT;

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.actionsState,
};

export const ActionsBar = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const pageEvents = usePageEventHandler<PageEventsT>();

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
          <button onClick={() => pageEvents.closeActions()}>
            <Icon className={cn(lvi.leadingIcon)} name="close" />
          </button>
        </div>
      </div>
    );
  }, DefaultProps)
);
