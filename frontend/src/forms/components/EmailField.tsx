import { useFieldProps } from 'src/forms/hooks';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';

type PropsT = {
  className?: any;
  placeholder?: string;
};

export const EmailField = (props: PropsT) => {
  const fieldProps = useFieldProps({ fieldType: 'text' });
  const l = L.FormField;

  return (
    <div
      className={cn(
        'EmailField',
        //
        //
        l.root(),
        props.className
      )}
    >
      <input
        placeholder={props.placeholder}
        {...fieldProps}
        className={l.input()}
      />
    </div>
  );
};
