import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { highlightUIHandlers, HighlightUIPropsT } from 'skandha-facets';
import { ActionT } from 'src/api/types/ActionT';
import { colBanner, rowSkewer } from 'src/frames/components';
import { isUpdating } from 'src/resourceStates';
import { cln, cn } from 'src/utils/classnames';

// Import styles
import './ActionListViewItem.scss';

export type PropsT = {
  action: ActionT;
  highlightUIProps: HighlightUIPropsT;
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
      className={cln(
        'ActionListViewItem',
        appearance,
        props.className
      )(
        //
        colBanner,
        'py-3 px-4'
      )}
      {...highlightUIHandlers(props.highlightUIProps)}
    >
      <div className={cn('ActionListViewItem__Header', rowSkewer)}>
        <div className={cn('ActionListViewItem__Title', 'mr-2')}>
          {getTitle(props.action)}
        </div>
        <div className={cn('ActionListViewItem__PlaylistName')}>
          {props.action.data['playlist_name']}
        </div>
      </div>
      <div
        className={cn(
          'ActionListViewItem__ClipNames',
          'flex flex-row flex-wrap'
        )}
      >
        {getClipNames(props.action, true)}
      </div>
    </div>
  );
});

const getTitle = (action: ActionT) => {
  const clipNames = action.data.clip_names;
  const label = clipNames.length > 1 ? 'clips' : 'clip';
  const date = action.data.date ? new Date(action.data.date) : new Date();
  return `Removed ${clipNames.length
    .toString()
    .padStart(2, ' ')} ${label} on ${formatDate(date)}`;
};

const getClipNames = (action: ActionT, isExpanded: boolean) => {
  const clipNames = isExpanded
    ? action.data.clip_names
    : R.take(3, action.data.clip_names);
  const postfix = isExpanded ? '' : '...';
  return `${clipNames.join(', ')}` + postfix;
};

const formatDate = (date: Date) => {
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1; // JavaScript months are 0-based
  const year: number = date.getFullYear();
  return `${day}/${month}/${year}`;
};
