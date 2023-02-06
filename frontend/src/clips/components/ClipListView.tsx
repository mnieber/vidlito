import { observer } from 'mobx-react-lite';
import {
  useDragAndDropUIConnector,
  useSelectionUIConnector,
} from 'skandha-mobx/hooks';
import { isLoading, isUpdating } from 'src/api/ResourceState';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListViewItem } from 'src/clips/components/ClipListViewItem';
import UIkit from 'src/frames/styles/uikit';
import { createOnSelectItemHandler } from 'src/routes/utils';
import { cn } from 'src/utils/classnames';
import './ClipListView.scss';

export type PropsT = {
  updateUrl?: (clip: ClipT) => void;
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
    const dragAndDropUIConnector = useDragAndDropUIConnector(
      props.clipsDragAndDrop
    );
    const selectionUIConnector = useSelectionUIConnector(
      props.clipsSelection,
      {
        onSelectItem: createOnSelectItemHandler(props.clips, props.updateUrl),
        itemSelector: '.ClipListViewItem',
      },
      [props.clips, props.updateUrl]
    );

    if (isLoading(props.clips)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.clips?.length) return null;

    const noItems = <h2>There are no clips</h2>;

    const clipDivs = props.clips.map((clip, idx) => {
      const isHighlighted = clip && props.clipsHighlight.id === clip.id;

      return (
        <ClipListViewItem
          key={clip.id}
          clip={clip}
          isHighlighted={isHighlighted}
          selectionUIProps={selectionUIConnector.handle(clip.id)}
          dragAndDropUIProps={dragAndDropUIConnector.handle(clip.id)}
          onContextMenu={(e) => {
            e.preventDefault();
            props.dashboardState.openContextMenuAtPoint({
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
