import { observer } from 'mobx-react-lite';
import { useSelectionUIConnector } from 'skandha-mobx/hooks';
import { defaultProps as dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListItem } from 'src/clips/components/ClipListItem';
import { cn } from 'src/utils/classnames';
import './ClipList.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
  ...dps.clipsHighlight,
  ...dps.clipsSelection,
};

export const ClipList = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const selectionUIConnector = useSelectionUIConnector(props.clipsSelection);

    const noItems = <h2>There are no clips</h2>;

    const clipDivs = props.clips.map((clip) => {
      return (
        <ClipListItem
          key={clip.id}
          clip={clip}
          isHighlighted={clip && props.clipsHighlight.id === clip.id}
          selectionUIProps={selectionUIConnector.handle(clip.id)}
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
