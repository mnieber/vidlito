import { observer } from 'mobx-react-lite';
import {
  dragAndDropUIHandlers,
  DragAndDropUIPropsT,
} from 'skandha-facets/DragAndDrop';
import {
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets/Selection';
import { isUpdating } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipKeyHandler } from 'src/clips/components/ClipKeyHandler';
import { rowSkewer } from 'src/frames/components';
import UIkit from 'src/frames/styles/uikit';
import { cn } from 'src/utils/classnames';
import './ClipListViewItem.scss';

export type PropsT = {
  isHighlighted: boolean;
  dragAndDropUIProps: DragAndDropUIPropsT;
  selectionUIProps: SelectionUIPropsT;
  onContextMenu?: (e: React.MouseEvent) => void;
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.videoPlayerState,
};

export const ClipListViewItem = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isUpdating(props.clip)) {
      return UIkit && <div data-uk-spinner className=""></div>;
    }

    return (
      <ClipKeyHandler
        clip={props.clip}
        videoPlayerState={props.videoPlayerState}
      >
        <div
          tabIndex={123}
          className={cn(
            'ClipListViewItem',
            'grid grid-cols-[1fr,1fr]',
            'p-2',
            {
              'ClipListViewItem--selected': props.selectionUIProps.isSelected,
              'ClipListViewItem--highlighted': props.isHighlighted,
            },
            `ClipListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
            props.className
          )}
          {...selectionUIHandlers(props.selectionUIProps)}
          {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
          // onKeyDown={(e: any) => {
          //   if (e.keyCode === 13) {
          //     props.videoController.togglePlay();
          //   }
          // }}
          onContextMenu={props.onContextMenu}
        >
          <div
            className={cn(
              'ClipListViewItem__Title',
              rowSkewer,
              'justify-start'
            )}
          >
            <div className={cn('ClipListViewItem__Field')}>
              {props.clip.name}
            </div>
          </div>
          <div
            className={cn(
              'ClipListViewItem__Buttons',
              rowSkewer,
              'justify-end'
            )}
          ></div>
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
