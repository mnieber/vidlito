import { useFormStateContext } from 'react-form-state-context';
import {
  DialogButton,
  DialogButtonPropsT,
} from '/src/frames/components/DialogButton';

// Import styles
import './FormCancelButton.MainView.scss';

export type PropsT = DialogButtonPropsT & {};

export const FormCancelButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const disabled = props.disabled || formState.getFlag('submitting');

  return (
    <DialogButton
      classNames={{
        base: 'FormCancelButton',
        danger: 'FormCancelButton--danger',
        default: 'FormCancelButton--default',
        disabled: 'FormCancelButton--disabled',
      }}
      onClick={(e: any) => {
        e.preventDefault();
        formState.cancel();
      }}
      disabled={disabled}
      color="blue"
      {...props}
    />
  );
};
