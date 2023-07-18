import { useFormStateContext } from 'react-form-state-context';
import { cn } from '/src/utils/classnames';

// Note: there is no .scss file for this component because the style depends
// on the context in which it is used.

export type PropsT = {
  label: string;
  disabled?: boolean;
  danger?: boolean;
  tabIndex?: number;
  dataCy?: string;
  className?: any;
};

export const FormSaveButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const disabled = props.disabled || formState.getFlag('submitting');

  return (
    <button
      className={cn(
        'FormSaveButton',
        { 'FormSaveButton--disabled': disabled },
        { 'FormSaveButton--default': !props.danger },
        { 'FormSaveButton--danger': props.danger },
        props.className
      )}
      data-cy={props.dataCy}
      tabIndex={props.tabIndex}
      onClick={(e) => {
        e.preventDefault();
        formState.submit();
      }}
      disabled={disabled}
    >
      {props.label}
    </button>
  );
};
