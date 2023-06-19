import { observer } from 'mobx-react-lite';
import { Selection } from 'skandha-facets';
import {
  useDragAndDropUIConnector,
  useSelectionUIConnector,
} from 'skandha-mobx/hooks';
import { isLoading } from '/src/api/getState';
import { ClipT } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipListViewItem } from '/src/clips/components/ClipListViewItem';
import { L } from '/src/frames/layout';
import { ClipsNavEvents, useNavHandler } from '/src/frames/pages';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipListView.scss';

const useNavEvents = () => useNavHandler<typeof ClipsNavEvents>();

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
  ...dps.clipsDragAndDrop,
  ...dps.clipsHighlight,
  ...dps.clipsSelection,
  ...dps.dashboardState,
};

export const ClipListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const nav = useNavEvents();

    const dragAndDropUIConnector = useDragAndDropUIConnector(
      props.clipsDragAndDrop
    );
    const selectionUIConnector = useSelectionUIConnector(
      props.clipsSelection as Selection<ClipT>,
      {
        focusElm: (id: string, idx: number) => {
          const elm = document.querySelectorAll('.ClipListViewItem')[idx];
          if (elm) {
            (elm as any).focus();
            const clip = props.clips.find((clip) => clip.id === id);
            if (clip) {
              nav.userHighlightsClip(clip.slug);
            }
          }
        },
      },
      [props.clips, nav]
    );

    if (isLoading(props.clips)) {
      return <ClipListViewLoader {...props} />;
    }

    const noItems = <h2>There are no clips</h2>;

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
      <div className={cn('ClipListView', props.className)}>
        {clipDivs.length > 0 && clipDivs}
        {clipDivs.length === 0 && noItems}
      </div>
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
