import { observer } from 'mobx-react-lite';
import {
  dragAndDropUIHandlers,
  DragAndDropUIPropsT,
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets';
import { isUpdating } from '/src/api/getState';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistListViewItem.scss';

export type PropsT = {
  isHighlighted: boolean;
  dragAndDropUIProps: DragAndDropUIPropsT;
  selectionUIProps: SelectionUIPropsT;
  className?: any;
  goToPlaylist: (playlist: PlaylistT) => void;
};

const DefaultProps = {
  ...dps.playlist,
};

export const PlaylistListViewItem = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isUpdating(props.playlist)) {
      return null;
    }

    const l = L.Lvi;

    return (
      //
      // 🔳 PlaylistListViewItem 🔳
      //
      <div
        className={cn(
          'PlaylistListViewItem',
          {
            'PlaylistListViewItem--selected': props.selectionUIProps.isSelected,
            'PlaylistListViewItem--highlighted': props.isHighlighted,
          },
          `PlaylistListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
          //
          //
          l.root(),
          props.className
        )}
        {...selectionUIHandlers(props.selectionUIProps)}
        {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
      >
        {
          // 🔳 Icon 🔳
        }
        <div
          className={cn(
            'IconContainer',
            //
            //
            l.icon.root(),
            L.row.skewer()
          )}
          onClick={() => {
            props.goToPlaylist(props.playlist);
          }}
        >
          <Icon
            className={cn('w-[15px] h-[15px]', 'fill-gray-700')}
            name="arrowRight"
          />
        </div>
        {
          // 🔳 Title 🔳
        }
        <div
          className={cn(
            'PlaylistListViewItem__Title',
            //
            //
            l.title()
          )}
        >
          <div>{props.playlist.name}</div>
        </div>
      </div>
    );
  }, DefaultProps)
);
