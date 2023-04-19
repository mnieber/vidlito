import { observer } from 'mobx-react-lite';
import {
  dragAndDropUIHandlers,
  DragAndDropUIPropsT,
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, rowSkewer, Spinner } from 'src/frames/components';
import { lvi } from 'src/frames/components/Lvi';
import { isUpdating } from 'src/resourceStates';
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
      return <Spinner />;
    }

    const appearance = [
      {
        'PlaylistListViewItem--selected': props.selectionUIProps.isSelected,
        'PlaylistListViewItem--highlighted': props.isHighlighted,
      },
      `PlaylistListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
    ];

    return (
      <div
        className={cn(
          ['PlaylistListViewItem', lvi.container],
          appearance,
          props.className
        )}
        {...selectionUIHandlers(props.selectionUIProps)}
        {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
      >
        <div
          className={cn('IconContainer', lvi.leadingIcon, rowSkewer)}
          onClick={() => {
            props.goToPlaylist(props.playlist);
          }}
        >
          <Icon className={cn('w-[15px] h-[15px]')} name="arrow-right" />
        </div>
        <div className={cn(['PlaylistListViewItem__Title', lvi.title])}>
          {`${props.playlist.name} (${props.playlist.clipSet.length})`}
        </div>
      </div>
    );
  }, DefaultProps)
);
