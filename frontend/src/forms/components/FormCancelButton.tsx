import { useFormStateContext } from 'react-form-state-context';
import {
  DialogButton,
  DialogButtonPropsT,
} from '/src/frames/components/DialogButton';

// Import styles
import './FormCancelButton-DialogButton.MainView.scss';

export type PropsT = DialogButtonPropsT & {};

export const FormCancelButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const disabled = props.disabled || formState.getFlag('submitting');

  return (
    <DialogButton
      componentClassName="FormCancelButton-DialogButton"
      onClick={(e: any) => {
        e.preventDefault();
        formState.cancel();
      }}
      disabled={disabled}
      {...props}
    />
  );
};
