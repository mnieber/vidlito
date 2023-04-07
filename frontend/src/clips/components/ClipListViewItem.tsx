import { observer } from 'mobx-react-lite';
import {
  dragAndDropUIHandlers,
  DragAndDropUIPropsT,
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipKeyHandler } from 'src/clips/components/ClipKeyHandler';
import { lvi } from 'src/frames/components/Lvi';
import { isUpdating } from 'src/resourceStates';
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
    const appearance = [
      {
        'ClipListViewItem--selected': props.selectionUIProps.isSelected,
        'ClipListViewItem--highlighted': props.isHighlighted,
      },
      `ClipListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
      { 'animate-delete': isUpdating(props.clip) },
    ];

    return (
      <ClipKeyHandler
        clip={props.clip}
        videoPlayerState={props.videoPlayerState}
      >
        <div
          tabIndex={0}
          className={cn(
            ['ClipListViewItem', lvi.container],
            appearance,
            props.className
          )}
          {...selectionUIHandlers(props.selectionUIProps)}
          {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
          onContextMenu={props.onContextMenu}
        >
          <PlayVideoIcon
            className={cn(lvi.leadingIcon)}
            videoController={props.videoPlayerState.videoController}
            visible={
              props.videoPlayerState.videoController.ready &&
              props.isHighlighted
            }
          />
          <div className={cn('ClipListViewItem__Title', lvi.title)}>
            {props.clip.name}
          </div>
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
