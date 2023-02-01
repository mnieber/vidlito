import { observer } from 'mobx-react-lite';
import {
  useDragAndDropUIConnector,
  useSelectionUIConnector,
} from 'skandha-mobx/hooks';
import { isLoaded } from 'src/api/ResourceState';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListItem } from 'src/clips/components/ClipListItem';
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
    const dragAndDropUIConnector = useDragAndDropUIConnector(
      props.clipsDragAndDrop
    );
    const selectionUIConnector = useSelectionUIConnector(
      props.clipsSelection,
      {
        onSelectItem: getUpdateUrlFn(props.clips, props.updateUrl),
      },
      [props.clips, props.updateUrl]
    );

    if (!isLoaded(props.clips)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.clips?.length) return null;

    const noItems = <h2>There are no clips</h2>;

    const clipDivs = props.clips.map((clip) => {
      return (
        <ClipListItem
          key={clip.id}
          clip={clip}
          isHighlighted={clip && props.clipsHighlight.id === clip.id}
          selectionUIProps={selectionUIConnector.handle(clip.id)}
          dragAndDropUIProps={dragAndDropUIConnector.handle(clip.id)}
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
