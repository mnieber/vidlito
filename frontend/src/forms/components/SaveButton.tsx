import { useFormStateContext } from 'react-form-state-context';
import { button } from 'src/frames/components/Button';
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
      className={cn([button, 'bg-blue-400', 'text-blue-50'], props.className)}
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
