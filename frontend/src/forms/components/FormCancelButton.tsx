import { useFormStateContext } from 'react-form-state-context';
import {
  DefaultDialogButtonTrims,
  DialogButton,
  DialogButtonPropsT,
} from '/src/frames/components/DialogButton';
import { DialogButtonTrimsT } from '/src/frames/components/DialogButton/DialogButton';
import { createTrims } from '/src/utils/trim';

// Import styles
import './FormCancelButton-DialogButton.MainView.scss';

export type PropsT = DialogButtonPropsT & {};

export const FormCancelButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const disabled = props.disabled || formState.getFlag('submitting');

  return (
    <DialogButton
      trims={DialogButtonTrims}
      onClick={(e: any) => {
        e.preventDefault();
        formState.cancel();
      }}
      disabled={disabled}
      {...props}
    />
  );
};

const DialogButtonTrims = createTrims(
  'FormCancelButton-DialogButton',
  DefaultDialogButtonTrims as DialogButtonTrimsT,
  {
    danger: {
      root: {
        fontSize: 'text-3xl',
      },
    },
  }
);
