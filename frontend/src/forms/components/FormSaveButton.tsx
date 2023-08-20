import { useFormStateContext } from 'react-form-state-context';
import {
  DefaultDialogButtonTrim,
  DialogButton,
  DialogButtonPropsT,
} from '/src/frames/components/DialogButton';
import { createTrim } from '/src/utils/trim';

// Import styles
import './FormSaveButton-DialogButton.AuthCard.scss';
import './FormSaveButton-DialogButton.MainView.scss';

export type PropsT = DialogButtonPropsT & {};

export const FormSaveButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const disabled = props.disabled || formState.getFlag('submitting');

  return (
    <DialogButton
      trim={DialogButtonTrim}
      onClick={(e: any) => {
        e.preventDefault();
        formState.submit();
      }}
      disabled={disabled}
      {...props}
    />
  );
};

const DialogButtonTrim = createTrim(
  'FormSaveButton-DialogButton',
  DefaultDialogButtonTrim,
  {}
);
