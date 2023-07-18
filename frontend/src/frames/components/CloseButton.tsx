import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { DialogButtonL } from '/src/frames/components/DialogButton';
import { Icon } from '/src/frames/components/Icon';
import { cn } from '/src/utils/classnames';

// Import styles
import './CloseButton.scss';

export type PropsT = {
  onClick: () => void;
  className?: any;
};

export const DefaultProps = {};

export const CloseButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn(
          'CloseButton',
          //
          //
          DialogButtonL.root(),
          DialogButtonL.color.skyBlueTextAndBorder(),
          props.className
        )}
        onClick={props.onClick}
      >
        <Icon
          className={cn(
            DialogButtonL.icon.root(),
            DialogButtonL.icon.color.skyBlue()
          )}
          name="close"
        />
        Close
      </button>
    );
  }, DefaultProps)
);
