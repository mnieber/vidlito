import { observer } from 'mobx-react-lite';
import { SelectionParamsT } from 'skandha-facets/Selection';
import {
  useDragAndDropUIConnector,
  useSelectionUIConnector,
} from 'skandha-mobx/hooks';
import { isLoaded } from 'src/api/ResourceState';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListViewItem } from 'src/clips/components/ClipListViewItem';
import { useMenuHandler } from 'src/frames/hooks/useMenuHandler';
import UIkit from 'src/frames/styles/uikit';
import { getUpdateUrlFn } from 'src/routes/utils';
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
};

export const ClipListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const menuHandler = useMenuHandler();

    const dragAndDropUIConnector = useDragAndDropUIConnector(
      props.clipsDragAndDrop
    );
    const selectionUIConnector = useSelectionUIConnector(
      props.clipsSelection,
      {
        onSelectItem: (selectionParams: SelectionParamsT) => {
          if (
            selectionParams.itemId &&
            !(selectionParams.isCtrl || selectionParams.isShift)
          ) {
            const ufn = getUpdateUrlFn(props.clips, props.updateUrl);
            ufn && ufn(selectionParams.itemId);
          }
        },
      },
      [props.clips, props.updateUrl]
    );

    if (!isLoaded(props.clips)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.clips?.length) return null;

    const noItems = <h2>There are no clips</h2>;

    const clipDivs = props.clips.map((clip, idx) => {
      return (
        <ClipListViewItem
          key={clip.id}
          clip={clip}
          isHighlighted={clip && props.clipsHighlight.id === clip.id}
          selectionUIProps={selectionUIConnector.handle(clip.id)}
          dragAndDropUIProps={dragAndDropUIConnector.handle(clip.id)}
          onContextMenu={menuHandler.handleContextMenu(idx + 1)}
        />
      );
    });

    const menuDiv = UIkit && (
      <div key="menu" ref={menuHandler.ref} data-uk-dropdown="mode:click">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    );

    return (
      <div className={cn('ClipListView', props.className)}>
        {clipDivs.length > 0 && menuHandler.insertMenuDiv(clipDivs, menuDiv)}
        {clipDivs.length === 0 && noItems}
      </div>
    );
  }, DefaultProps)
);
