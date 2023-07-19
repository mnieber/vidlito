import { useFormStateContext } from 'react-form-state-context';
import {
  DialogButton,
  DialogButtonPropsT,
} from '/src/frames/components/DialogButton';

// Import styles
import './FormSaveButton.AuthCard.scss';
import './FormSaveButton.MainView.scss';

export type PropsT = DialogButtonPropsT & {};

export const FormSaveButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const disabled = props.disabled || formState.getFlag('submitting');

  return (
    <DialogButton
      classNames={{
        base: 'FormSaveButton',
        danger: 'FormSaveButton--danger',
        default: 'FormSaveButton--default',
        disabled: 'FormSaveButton--disabled',
      }}
      onClick={(e: any) => {
        e.preventDefault();
        formState.submit();
      }}
      disabled={disabled}
      color="blue"
      {...props}
    />
  );
};
