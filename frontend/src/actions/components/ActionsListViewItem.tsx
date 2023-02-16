import { observer } from 'mobx-react-lite';
import { isUpdating } from 'src/api/ResourceState';
import { ActionT } from 'src/api/types/ActionT';
import { withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import UIkit from 'src/frames/styles/uikit';
import { cn } from 'src/utils/classnames';
import './ActionsListViewItem.scss';

export type PropsT = {
  action: ActionT;
  className?: any;
};

const DefaultProps = {};

export const ActionsListViewItem = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isUpdating(props.action)) {
      return UIkit && <div data-uk-spinner className=""></div>;
    }

    return (
      <div
        className={cn(
          'ActionsListViewItem',
          'grid grid-cols-[1fr,1fr]',
          'p-2',
          props.className
        )}
      >
        <div
          className={cn(
            'ActionsListViewItem__Title',
            rowSkewer,
            'justify-start'
          )}
        >
          <div className={cn('ActionsListViewItem__Field')}>
            {props.action.type}
          </div>
          <div className={cn('ActionsListViewItem__Field')}>
            {props.action.playlistId}
          </div>
          <div className={cn('ActionsListViewItem__Field')}>
            {props.action.data}
          </div>
          <div className={cn('ActionsListViewItem__Field')}>
            {props.action.teaser}
          </div>
        </div>
        <div
          className={cn(
            'ActionsListViewItem__Buttons',
            rowSkewer,
            'justify-end'
          )}
        ></div>
      </div>
    );
  }, DefaultProps)
);
