import { FieldPropsT, useFieldProps } from '/src/forms/hooks';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './TextField.scss';

export type PropsT = Partial<FieldPropsT> & {
  className?: any;
};

export const TextField = (props: PropsT) => {
  const fieldProps = useFieldProps({
    ...props,
    fieldType: props.fieldType ?? 'text',
  });
  const l = L.FormField;

  return (
    <div
      className={cn(
        'TextField',
        //
        //
        l.root(),
        props.className
      )}
    >
      <input {...fieldProps} className={l.input()} />
    </div>
  );
};
