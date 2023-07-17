import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
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
          L.DialogButton.root(),
          L.DialogButton.color.skyBlueTextAndBorder(),
          props.className
        )}
        onClick={props.onClick}
      >
        <Icon
          className={cn(
            L.DialogButton.icon.root(),
            L.DialogButton.icon.color.skyBlue()
          )}
          name="close"
        />
        Close
      </button>
    );
  }, DefaultProps)
);
