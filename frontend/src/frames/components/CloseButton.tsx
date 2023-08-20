import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import {
  DialogButton,
  SkyBlueWithBorderDialogButtonTrim,
} from '/src/frames/components/DialogButton';

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
        trim={SkyBlueWithBorderDialogButtonTrim}
        label="Close"
        onClick={props.onClick}
        iconName="close"
      />
    );
  }, DefaultProps)
);
