import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './NewClipButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsAddition,
};

export const NewClipButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn('NewClipButton', mainButton, props.className)}
        onClick={() => props.clipsAddition.add({})}
      >
        <Icon name="plus" />
        New Clip
      </button>
    );
  }, DefaultProps)
);
