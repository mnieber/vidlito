import { observer } from 'mobx-react-lite';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './NewClipButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsAddition,
  ...dps.locationState,
};

export const NewClipButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn('NewClipButton', mainButton, props.className)}
        onClick={() => {
          props.clipsAddition.add({}).then((localClip: ClipT) => {
            props.locationState.goToClip(localClip);
          });
        }}
      >
        <Icon name="plus" />
        New Clip
      </button>
    );
  }, DefaultProps)
);
