import { useFormStateContext } from 'react-form-state-context';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  label: string;
  disabled?: boolean;
  className?: any;
  tabIndex?: number;
  useDefaultClassName?: boolean;
};

export const FormCancelButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const disabled = props.disabled || formState.getFlag('submitting');

  return (
    <button
      className={cn(
        'FormCancelButton',
        { 'FormCancelButton--disabled': disabled },
        props.className
      )}
      onClick={(e) => {
        e.preventDefault();
        formState.cancel();
      }}
      tabIndex={props.tabIndex}
      disabled={disabled}
    >
      {props.label}
    </button>
  );
};
