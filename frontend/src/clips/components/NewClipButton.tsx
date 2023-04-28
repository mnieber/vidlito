import { observer } from 'mobx-react-lite';
import { ClipT, createClip } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { ToolButton_ } from 'src/frames/components/ToolButton';
import { ClipsUrlEvents, useUrlEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import './NewClipButton.scss';

const useUrlEvents = () => useUrlEventHandler<typeof ClipsUrlEvents>();

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsAddition,
};

export const NewClipButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEvents();

    return (
      <button
        className={cn('NewClipButton', ToolButton_.root, props.className)}
        onClick={() => {
          props.clipsAddition
            .add({ values: createClip({}) })
            .then((localClip: ClipT) => {
              urlEvents.userHighlightsClip(localClip.slug);
            });
        }}
      >
        <Icon className={cn(ToolButton_.icon.normal)} name="plus" />
        Clip
      </button>
    );
  }, DefaultProps)
);
