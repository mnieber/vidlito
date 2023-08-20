import { useFormStateContext } from 'react-form-state-context';
import {
  DefaultDialogButtonTrim,
  DialogButton,
  DialogButtonPropsT,
} from '/src/frames/components/DialogButton';
import { DialogButtonTrimT } from '/src/frames/components/DialogButton/DialogButton';
import { createTrim } from '/src/utils/trim';

// Import styles
import './FormCancelButton-DialogButton.MainView.scss';

export type PropsT = DialogButtonPropsT & {};

export const FormCancelButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const disabled = props.disabled || formState.getFlag('submitting');

  return (
    <DialogButton
      trim={DialogButtonTrim}
      onClick={(e: any) => {
        e.preventDefault();
        formState.cancel();
      }}
      disabled={disabled}
      {...props}
    />
  );
};

const DialogButtonTrim = createTrim(
  'FormCancelButton-DialogButton',
  DefaultDialogButtonTrim as DialogButtonTrimT,
  {
    danger: {
      root: {
        fontSize: 'text-3xl',
      },
    },
  }
);
