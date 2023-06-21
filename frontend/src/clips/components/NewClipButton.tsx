import { observer } from 'mobx-react-lite';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './NewClipButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsAddition,
  ...dps.userProfile,
};

export const NewClipButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
              navToClip(localClip.slug);
            });
        }}
      >
        <Icon className={cn(l.icon.normal())} name="plus" />
        Clip
      </button>
    );
  }, DefaultProps)
);
