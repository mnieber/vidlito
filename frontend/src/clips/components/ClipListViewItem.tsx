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
import { cn } from 'src/utils/classnames';
import { PlayVideoIcon } from 'src/videos/components';
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
    return (
      <ClipKeyHandler
        clip={props.clip}
        videoPlayerState={props.videoPlayerState}
      >
        <div
          tabIndex={0}
          className={cn(
            'ClipListViewItem',
            rowSkewer,
            'p-2',
            {
              'ClipListViewItem--selected': props.selectionUIProps.isSelected,
              'ClipListViewItem--highlighted': props.isHighlighted,
              'animate-[pulse_1s_ease-in-out_infinite]': isUpdating(props.clip),
            },
            `ClipListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
            props.className
          )}
          {...selectionUIHandlers(props.selectionUIProps)}
          {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
          onContextMenu={props.onContextMenu}
        >
          <PlayVideoIcon
            videoController={props.videoPlayerState.videoController}
            visible={
              props.videoPlayerState.videoController.ready &&
              props.isHighlighted
            }
          />
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
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
