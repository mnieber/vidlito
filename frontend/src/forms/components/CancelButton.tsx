import { useFormStateContext } from 'react-form-state-context';
import { button } from 'src/frames/components/Button';
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
      className={cn([button, 'text-blue-400'], props.className)}
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
