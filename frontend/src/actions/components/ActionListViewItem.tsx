import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import {
  highlightUIHandlers,
  HighlightUIPropsT,
} from 'skandha-facets/Highlight';
import { isUpdating } from 'src/api/ResourceState';
import { ActionT } from 'src/api/types/ActionT';
import { rowSkewer, Spinner } from 'src/frames/components';
import { Icon } from 'src/frames/components/Icon';
import { cn } from 'src/utils/classnames';
import './ActionListViewItem.scss';

export type PropsT = {
  action: ActionT;
  highlightUIProps: HighlightUIPropsT;
  isExpanded: boolean;
  onClick: () => void;
  className?: any;
};

export const ActionListViewItem = observer((props: PropsT) => {
  if (isUpdating(props.action)) {
    return <Spinner />;
  }

  return (
    <div
      className={cn(
        'ActionListViewItem',
        'grid grid-cols-[1fr,1fr]',
        'p-2',
        {
          'ActionListViewItem--highlighted':
            props.highlightUIProps.isHighlighted,
        },
        props.className
      )}
      {...highlightUIHandlers(props.highlightUIProps)}
    >
      <div
        className={cn('ActionListViewItem__Title', rowSkewer, 'justify-start')}
      >
        <div className={cn('ActionListViewItem__Field')}>
          {getTeaser(props.action, props.isExpanded)}
        </div>
      </div>
      <div
        className={cn('ActionListViewItem__Buttons', rowSkewer, 'justify-end')}
      >
        <button
          className={cn('ActionListViewItem__UndoButton', rowSkewer, {
            invisible: !props.highlightUIProps.isHighlighted,
          })}
          onClick={props.onClick}
        >
          <Icon name="reply" />
          Undo
        </button>
      </div>
    </div>
  );
});

const getTeaser = (action: ActionT, isExpanded: boolean) => {
  const clipNames = isExpanded
    ? action.data.clip_names
    : R.take(3, action.data.clip_names);
  const postfix = isExpanded ? '' : '...';
  const label = clipNames.length > 1 ? 'clips' : 'clip';
  const text = `Removed ${clipNames.length} ${label}: ${clipNames.join(', ')}`;
  return text + postfix;
};
