import { useFormStateContext } from 'react-form-state-context';
import { primaryGhostButton } from 'src/frames/components/Button';
import { cn } from 'src/utils/classnames';

export type PropsT = {
  label: string;
  disabled?: boolean;
  className?: any;
  tabIndex?: number;
  useDefaultClassName?: boolean;
};

export const CancelButton = (props: PropsT) => {
  const formState = useFormStateContext();

  return (
    <button
      className={cn(primaryGhostButton, props.className)}
      onClick={(e) => {
        e.preventDefault();
        formState.cancel();
      }}
      tabIndex={props.tabIndex}
      disabled={props.disabled || formState.getFlag('submitting')}
    >
      {props.label}
    </button>
  );
};
