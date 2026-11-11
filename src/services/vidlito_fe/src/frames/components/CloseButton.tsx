import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
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

export const ContextProps = {};

export const CloseButton = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <DialogButton
        trim={SkyBlueWithBorderDialogButtonTrim}
        label="Close"
        onClick={props.onClick}
        iconName="close"
      />
    );
  }, ContextProps)
);
