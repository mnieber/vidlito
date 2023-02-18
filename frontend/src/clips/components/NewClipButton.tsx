import { observer } from 'mobx-react-lite';
import { ClipT, createClip } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './NewClipButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsAddition,
  ...dps.urlState,
  ...dps.playlist,
};

export const NewClipButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn('NewClipButton', mainButton, props.className)}
        onClick={() => {
          props.clipsAddition.add(createClip({})).then((localClip: ClipT) => {
            props.urlState.goToClip(localClip, props.playlist.slug);
          });
        }}
      >
        <Icon name="plus" />
        New Clip
      </button>
    );
  }, DefaultProps)
);
