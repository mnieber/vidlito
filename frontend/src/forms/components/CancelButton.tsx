import { useFormStateContext } from 'react-form-state-context';
import { button } from 'src/frames/components';
import { cn } from 'src/utils/classnames';

export type PropsT = {
  label: string;
  disabled?: boolean;
  className?: any;
  classNameExt?: any;
};

export const CancelButton = (props: PropsT) => {
  const formState = useFormStateContext();
  return (
    <button
      className={cn(props.className ?? [button, `!mr-2`], props.classNameExt)}
      onClick={(e) => {
        e.preventDefault();
        formState.cancel();
      }}
      disabled={props.disabled || formState.getFlag('submitting')}
    >
      {props.label}
    </button>
  );
};
