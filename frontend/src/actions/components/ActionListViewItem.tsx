import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { highlightUIHandlers, HighlightUIPropsT } from 'skandha-facets';
import { ActionT } from 'src/api/types/ActionT';
import { rowSkewer } from 'src/frames/components';
import { Icon } from 'src/frames/components/Icon';
import { lvi } from 'src/frames/components/Lvi';
import { isUpdating } from 'src/resourceStates';
import { cn, d } from 'src/utils/classnames';
import './ActionListViewItem.scss';

export type PropsT = {
  action: ActionT;
  highlightUIProps: HighlightUIPropsT;
  isExpanded: boolean;
  onClick: () => void;
  className?: any;
};

export const ActionListViewItem = observer((props: PropsT) => {
  const appearance = [
    {
      'ActionListViewItem--highlighted': props.highlightUIProps.isHighlighted,
    },
    { 'animate-delete': isUpdating(props.action) },
  ];

  return (
    <div
      className={cn(
        ['ActionListViewItem', lvi.container],
        appearance,
        props.className
      )}
      {...highlightUIHandlers(props.highlightUIProps)}
    >
      <div className={cn([d('ActionListViewItem__Title'), lvi.title])}>
        {getTeaser(props.action, props.isExpanded)}
      </div>
      <div
        className={cn(
          d('ActionListViewItem__Buttons'),
          rowSkewer,
          'justify-end'
        )}
      >
        <button
          className={cn('ActionListViewItem__UndoButton', rowSkewer, {
            invisible: !props.highlightUIProps.isHighlighted,
          })}
          onClick={props.onClick}
        >
          <Icon className={cn(lvi.leadingIcon)} name="reply" />
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
