import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { useNavContext } from 'react-nav-handler';
import {
  DragAndDropUIConnector,
  Selection,
  SelectionUIConnector,
} from 'skandha-facets';
import { ClipT } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipListViewKeyHandler } from '/src/clips/components';
import { ClipListViewItem } from '/src/clips/components/ClipListViewItem';
import { toClip } from '/src/clips/navFunctions';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipListView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
  ...dps.clips,
  ...dps.clipsDragAndDrop,
  ...dps.clipsHighlight,
  ...dps.clipsHovering,
  ...dps.clipsSelection,
  ...dps.dashboardState,
};

export const ClipListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    //
    // 🔳  Handle loading state 🔳
    //
    const navContext = useNavContext('ClipListView');

    if (isLoading(props.clips)) {
      return <ClipListViewLoader {...props} />;
    }

    const dragAndDropUIConnector = new DragAndDropUIConnector({
      dragAndDrop: props.clipsDragAndDrop,
      hovering: props.clipsHovering,
    });

    const selectionUIConnector = new SelectionUIConnector({
      selection: props.clipsSelection as Selection<ClipT>,
      onSelect: (args: {
        itemId: string | undefined;
        isShift?: boolean | undefined;
        isCtrl?: boolean | undefined;
      }) => {
        if (!args.isShift && !args.isCtrl) {
          const clip = props.clips.find((x) => x.id === args.itemId);
          if (clip) {
            navContext.nav(toClip)(
              props.playlist.ownerUsername,
              props.playlist.slug,
              clip.slug
            );
          }
        }
      },
    });

    //
    // 🔳 clipDivs 🔳
    //
    const clipDivs = props.clips.map((clip) => {
      return (
        <ClipListViewItem
          key={`item-${clip.id}`}
          clip={clip}
          showSelectionBg={props.clipsSelection.itemIds.length > 1}
          isHighlighted={clip && props.clipsHighlight.itemId === clip.id}
          selectionUIProps={selectionUIConnector.handle(clip.id)}
          dragAndDropUIProps={dragAndDropUIConnector.handle(clip.id)}
          onContextMenu={(e: any) => {
            e.preventDefault();
            props.dashboardState.clipListContextMenu.openAtPoint({
              x: e.clientX,
              y: e.clientY,
            });
          }}
        />
      );
    });

    const noItems = (
      <h2 className="ClipListView__NoItems">There are no clips yet</h2>
    );

    //
    // 🔳 ClipListView 🔳
    //
    return (
      <ClipListViewKeyHandler className={cn(props.className)}>
        <div className={cn('ClipListView')} tabIndex={0}>
          {clipDivs.length > 0 && clipDivs}
          {clipDivs.length === 0 && noItems}
        </div>
      </ClipListViewKeyHandler>
    );
  }, DefaultProps)
);

export const ClipListViewLoader = (props: { className?: any }) => {
  const loaderBars = [1, 2, 3, 4, 5].map((id) => {
    return <LoaderBar key={`item-${id}`} className={cn('py-1 h-2 my-4')} />;
  });

  return (
    <div className={cn('ClipListViewLoader', props.className)}>
      {loaderBars}
    </div>
  );
};
