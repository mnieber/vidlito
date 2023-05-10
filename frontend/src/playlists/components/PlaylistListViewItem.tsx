import { observer } from 'mobx-react-lite';
import {
  dragAndDropUIHandlers,
  DragAndDropUIPropsT,
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, Spinner } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { isUpdating } from 'src/resourceStates';
import { cn } from 'src/utils/classnames';

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
      return <Spinner />;
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
            l.icon(),
            L.row.skewer()
          )}
          onClick={() => {
            props.goToPlaylist(props.playlist);
          }}
        >
          <Icon
            className={cn('w-[15px] h-[15px]', 'fill-gray-700')}
            name="arrow-right"
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
