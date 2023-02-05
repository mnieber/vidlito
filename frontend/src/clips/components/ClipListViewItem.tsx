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
import { Icon, rowSkewer } from 'src/frames/components';
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

    const icon =
      props.videoPlayerState.videoController.ready && props.isHighlighted ? (
        <div
          className={cn(rowSkewer)}
          onClick={() => {
            props.videoPlayerState.videoController.togglePlay();
          }}
        >
          <Icon
            name={
              props.videoPlayerState.videoController.isPlaying
                ? 'clock'
                : 'play-circle'
            }
          />
        </div>
      ) : (
        <div className={cn('w-[28px]')}></div>
      );

    return (
      <ClipKeyHandler
        clip={props.clip}
        videoPlayerState={props.videoPlayerState}
      >
        <div
          tabIndex={123}
          className={cn(
            'ClipListViewItem',
            rowSkewer,
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
          onContextMenu={props.onContextMenu}
        >
          {icon}
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
