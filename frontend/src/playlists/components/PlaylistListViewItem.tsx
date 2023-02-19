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
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, rowSkewer } from 'src/frames/components';
import UIkit from 'src/frames/styles/uikit';
import { cn } from 'src/utils/classnames';
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
      return UIkit && <div data-uk-spinner className=""></div>;
    }

    return (
      <div
        className={cn(
          'PlaylistListViewItem',
          'grid grid-cols-[1fr,1fr]',
          'p-2',
          {
            'PlaylistListViewItem--selected': props.selectionUIProps.isSelected,
            'PlaylistListViewItem--highlighted': props.isHighlighted,
          },
          `PlaylistListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
          props.className
        )}
        {...selectionUIHandlers(props.selectionUIProps)}
        {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
      >
        <div
          className={cn(
            'PlaylistListViewItem__Title',
            rowSkewer,
            'justify-start'
          )}
        >
          <div
            className={cn('IconContainer', rowSkewer)}
            onClick={() => {
              props.goToPlaylist(props.playlist);
            }}
          >
            <Icon className="ml-2" name="arrow-right" ratio={0.75} />
          </div>
          <div className={cn('PlaylistListViewItem__Field')}>
            {props.playlist.name}
          </div>
        </div>
        <div
          className={cn(
            'PlaylistListViewItem__Buttons',
            rowSkewer,
            'justify-end'
          )}
        ></div>
      </div>
    );
  }, DefaultProps)
);
