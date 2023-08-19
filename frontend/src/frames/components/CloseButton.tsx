import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { DialogButton } from '/src/frames/components/DialogButton';
import { SkyBlueWithBorderDialogButtonTheme } from '/src/frames/components/DialogButton/DialogButton';

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
      <DialogButton
        theme={SkyBlueWithBorderDialogButtonTheme}
        label="Close"
        onClick={props.onClick}
        iconName="close"
      />
    );
  }, DefaultProps)
);
