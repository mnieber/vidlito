import { observer } from 'mobx-react-lite';
import {
  highlightUIHandlers,
  HighlightUIPropsT,
} from 'skandha-facets/Highlight';
import { isUpdating } from 'src/api/ResourceState';
import { ActionT } from 'src/api/types/ActionT';
import { rowSkewer } from 'src/frames/components';
import { Icon } from 'src/frames/components/Icon';
import UIkit from 'src/frames/styles/uikit';
import { cn } from 'src/utils/classnames';
import './ActionsListViewItem.scss';

export type PropsT = {
  action: ActionT;
  highlightUIProps: HighlightUIPropsT;
  className?: any;
};

export const ActionsListViewItem = observer((props: PropsT) => {
  if (isUpdating(props.action)) {
    return UIkit && <div data-uk-spinner className=""></div>;
  }

  return (
    <div
      className={cn(
        'ActionsListViewItem',
        'grid grid-cols-[1fr,1fr]',
        'p-2',
        {
          'ActionsListViewItem--highlighted':
            props.highlightUIProps.isHighlighted,
        },
        props.className
      )}
      {...highlightUIHandlers(props.highlightUIProps)}
    >
      <div
        className={cn('ActionsListViewItem__Title', rowSkewer, 'justify-start')}
      >
        <div className={cn('ActionsListViewItem__Field')}>
          {getTeaser(props.action)}
        </div>
      </div>
      <div
        className={cn('ActionsListViewItem__Buttons', rowSkewer, 'justify-end')}
      >
        <button
          className={cn({ invisible: !props.highlightUIProps.isHighlighted })}
        >
          <Icon name="check" />
          Undo
        </button>
      </div>
    </div>
  );
});

const getTeaser = (action: ActionT) => {
  const clipNames = action.data.clip_names;
  const label = clipNames.length > 1 ? 'clips' : 'clip';
  return `Removed ${clipNames.length} ${label}: ${clipNames.join(', ')}`;
};
