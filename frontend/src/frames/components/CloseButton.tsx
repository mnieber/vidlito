import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import {
  DialogButton,
  SkyBlueWithBorderDialogButtonTrims,
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
        trims={SkyBlueWithBorderDialogButtonTrims}
        label="Close"
        onClick={props.onClick}
        iconName="close"
      />
    );
  }, DefaultProps)
);
