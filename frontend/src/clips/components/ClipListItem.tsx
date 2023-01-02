import { observer } from 'mobx-react-lite';
import {
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets/Selection';
import { isUpdating } from 'src/api/ResourceState';
import { defaultProps as dps, withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import UIkit from 'uikit';
import './ClipListItem.scss';

export type PropsT = {
  isHighlighted: boolean;
  selectionUIProps: SelectionUIPropsT;
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
};

export const ClipListItem = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isUpdating(props.clip)) {
      return UIkit && <div data-uk-spinner className=""></div>;
    }

    return (
      <div
        className={cn(
          'ClipListItem',
          'grid grid-cols-[1fr,1fr]',
          'p-2',
          {
            'ClipListItem--selected': props.selectionUIProps.isSelected,
            'ClipListItem--highlighted': props.isHighlighted,
          },
          props.className
        )}
        {...selectionUIHandlers(props.selectionUIProps)}
      >
        <div className={cn('ClipListItem__Title', rowSkewer, 'justify-start')}>
          <div className={cn('ClipListItem__Field')}>{props.clip.name}</div>
        </div>
        <div
          className={cn('ClipListItem__Buttons', rowSkewer, 'justify-end')}
        ></div>
      </div>
    );
  }, DefaultProps)
);
