import { observer } from 'mobx-react-lite';
import {
  dragAndDropUIHandlers,
  DragAndDropUIPropsT,
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets';
import { isUpdating } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { LviL } from '/src/frames/components/Lvi';
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
  ...dps.playlistsDeletion,
};

export const ClipListViewItem = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const loading =
      !props.videoPlayerState.videoController.ready && props.isHighlighted;

    const showAsSelected =
      props.selectionUIProps.isSelected && props.showSelectionBg;

    const nrOfPlaylists =
      props.clip.nrOfPublicPlaylists + props.clip.nrOfPrivatePlaylists;
    const clipNamePostfix =
      props.playlistsDeletion.isDeleteEnabled && nrOfPlaylists === 1
        ? ' •'
        : '';

    return (
      //
      // 🔳 ClipListViewItem 🔳
      //
      <div
        className={cn(
          'ClipListViewItem',
          [
            {
              'ClipListViewItem--selected': showAsSelected,
              'text-gray-text': !(showAsSelected || props.isHighlighted),
              'ClipListViewItem--highlighted': props.isHighlighted,
            },
            `ClipListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
            { 'animate-delete': isUpdating(props.clip) },
          ],
          [LviL.root(), props.className]
        )}
        {...selectionUIHandlers(props.selectionUIProps)}
        {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
        onContextMenu={props.onContextMenu}
      >
        {
          // 🔳 PlayVideoIcon 🔳
        }
        <PlayVideoIcon
          className={cn(LviL.icon.root())}
          videoController={props.videoPlayerState.videoController}
          visible={
            props.videoPlayerState.videoController.ready && props.isHighlighted
          }
          loading={loading}
        />
        {
          // 🔳 Title 🔳
        }
        <div className={cn('ClipListViewItem__Title', LviL.title())}>
          {props.clip.name + clipNamePostfix}
        </div>
      </div>
    );
  }, DefaultProps)
);
