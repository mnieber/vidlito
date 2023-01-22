import { observer } from 'mobx-react-lite';
import {
  useDragAndDropUIConnector,
  useSelectionUIConnector,
} from 'skandha-mobx/hooks';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListItem } from 'src/clips/components/ClipListItem';
import { getUpdateUrlFn } from 'src/routes/utils';
import { cn } from 'src/utils/classnames';
import './ClipList.scss';

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

export const ClipList = observer(
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
      <div className={cn('ClipList', props.className)}>
        {clipDivs.length > 0 && clipDivs}
        {clipDivs.length === 0 && noItems}
      </div>
    );
  }, DefaultProps)
);
