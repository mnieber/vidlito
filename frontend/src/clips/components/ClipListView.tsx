import { observer } from 'mobx-react-lite';
import {
  Selection,
  SelectionUIConnector,
  createDragAndDropUIConnector,
} from 'skandha-facets';
import { isLoading } from '/src/api/getState';
import { ClipT } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { ClipListKeyHandler } from '/src/clips/components/ClipListKeyHandler';
import { ClipListViewItem } from '/src/clips/components/ClipListViewItem';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipListView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
  ...dps.clipsDragAndDrop,
  ...dps.clipsHovering,
  ...dps.clipsHighlight,
  ...dps.clipsSelection,
  ...dps.dashboardState,
};

export const ClipListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const dragAndDropUIConnector = createDragAndDropUIConnector(
      props.clipsDragAndDrop,
      props.clipsHovering
    );
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
            navToClip(clip.slug);
          }
        }
      },
    });

    if (isLoading(props.clips)) {
      return <ClipListViewLoader {...props} />;
    }

    const noItems = (
      <h2 className="text-primaryTeal">There are no clips yet</h2>
    );

    const clipDivs = props.clips.map((clip, idx) => {
      return (
        <ClipListViewItem
          key={`item-${clip.id}`}
          clip={clip}
          showSelectionBg={props.clipsSelection.ids.length > 1}
          isHighlighted={clip && props.clipsHighlight.id === clip.id}
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

    return (
      <ClipListKeyHandler>
        <div className={cn('ClipListView', props.className)} tabIndex={0}>
          {clipDivs.length > 0 && clipDivs}
          {clipDivs.length === 0 && noItems}
        </div>
      </ClipListKeyHandler>
    );
  }, DefaultProps)
);

export const ClipListViewLoader = observer(
  (props: PropsT & typeof DefaultProps) => {
    const l = L.Lvi;
    const clipDivs = [1, 2, 3, 4, 5].map((idx) => {
      return (
        <div
          key={`item-${idx}`}
          className={cn(
            'ClipListViewLoader__Item',
            l.root(),
            'h-2 my-4',
            'rounded bg-gray-300'
          )}
        ></div>
      );
    });

    return (
      <div className={cn('ClipListViewLoader', props.className)}>
        {clipDivs}
      </div>
    );
  }
);
