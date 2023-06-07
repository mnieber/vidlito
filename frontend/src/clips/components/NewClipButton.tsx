import { observer } from 'mobx-react-lite';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { ClipsNavEvents, useNavHandler } from '/src/frames/pages';
import { cn } from '/src/utils/classnames';

// Import styles
import './NewClipButton.scss';

const useNavEvents = () => useNavHandler<typeof ClipsNavEvents>();

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsAddition,
  ...dps.userProfile,
};

export const NewClipButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const nav = useNavEvents();
    const l = L.ToolButton;

    return (
      <button
        className={cn(
          'NewClipButton',
          //
          //
          l.root(),
          props.className
        )}
        onClick={() => {
          props.clipsAddition
            .add({ values: createClip(props.userProfile, {}) })
            .then((localClip: ClipT) => {
              nav.userHighlightsClip(localClip.slug);
            });
        }}
      >
        <Icon className={cn(l.icon.normal())} name="plus" />
        Clip
      </button>
    );
  }, DefaultProps)
);
