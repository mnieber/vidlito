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
import { cln, cn } from 'src/utils/classnames';
import { PlayVideoIcon } from 'src/videos/components';

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

    return (
      //
      // 🔳 ClipKeyHandler 🔳
      //
      <ClipKeyHandler
        clip={props.clip}
        videoPlayerState={props.videoPlayerState}
      >
        {
          // 🔳 ClipListViewItem 🔳
        }
        <div
          tabIndex={0}
          className={cln(
            'ClipListViewItem',
            'font-bold',
            {
              'ClipListViewItem--selected': showAsSelected,
              'text-gray-700': !(showAsSelected || props.isHighlighted),
              'ClipListViewItem--highlighted': props.isHighlighted,
            },
            `ClipListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
            { 'animate-delete': isUpdating(props.clip) }
          )(
            //
            lvi.container,
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
            className={cn(lvi.leadingIcon)}
            videoController={props.videoPlayerState.videoController}
            visible={
              props.videoPlayerState.videoController.ready &&
              props.isHighlighted
            }
            loading={loading}
          />
          {
            // 🔳 Title 🔳
          }
          <div className={cn('ClipListViewItem__Title', lvi.title)}>
            {props.clip.name}
          </div>
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
