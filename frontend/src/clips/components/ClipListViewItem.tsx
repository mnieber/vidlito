import { observer } from 'mobx-react-lite';
import {
  dragAndDropUIHandlers,
  DragAndDropUIPropsT,
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets';
import { isUpdating } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { PlayVideoIcon } from '/src/videos/components';

// Import styles
import './ClipListViewItem.scss';

export type PropsT = {
  isHighlighted: boolean;
  showSelectionBg: boolean;
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
    const loading =
      !props.videoPlayerState.videoController.ready && props.isHighlighted;

    const showAsSelected =
      props.selectionUIProps.isSelected && props.showSelectionBg;

    const l = L.Lvi;

    return (
      //
      // 🔳 ClipListViewItem 🔳
      //
      <div
        className={cn(
          'ClipListViewItem',
          'font-bold',
          {
            'ClipListViewItem--selected': showAsSelected,
            'text-textGray': !(showAsSelected || props.isHighlighted),
            'ClipListViewItem--highlighted': props.isHighlighted,
          },
          `ClipListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
          { 'animate-delete': isUpdating(props.clip) },
          //
          //
          l.root(),
          props.className
        )}
        {...selectionUIHandlers(props.selectionUIProps)}
        {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
        onContextMenu={props.onContextMenu}
      >
        {
          // 🔳 PlayVideoIcon 🔳
        }
        <PlayVideoIcon
          className={cn(l.icon.root())}
          videoController={props.videoPlayerState.videoController}
          visible={
            props.videoPlayerState.videoController.ready && props.isHighlighted
          }
          loading={loading}
        />
        {
          // 🔳 Title 🔳
        }
        <div className={cn('ClipListViewItem__Title', l.title())}>
          {props.clip.name}
        </div>
      </div>
    );
  }, DefaultProps)
);
