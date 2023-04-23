import { useFormStateContext } from 'react-form-state-context';
import { authCard } from 'src/auth/components/AuthCard';
import { cn } from 'src/utils/classnames';

export type PropsT = {
  label: string;
  disabled?: boolean;
  tabIndex?: number;
  className?: any;
};

export const SaveButton = (props: PropsT) => {
  const formState = useFormStateContext();
  return (
    <button
      className={cn(authCard.submitButton.container, props.className)}
      tabIndex={props.tabIndex}
      onClick={(e) => {
        e.preventDefault();
        formState.submit();
      }}
      disabled={props.disabled || formState.getFlag('submitting')}
    >
      {props.label}
    </button>
  );
};
