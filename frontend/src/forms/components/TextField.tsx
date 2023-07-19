import { FormFieldL } from '/src/forms/components/FormField';
import { FieldPropsT, useFieldProps } from '/src/forms/hooks';
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
  return (
    <div className={cn('TextField', [], [FormFieldL.root(), props.className])}>
      <input {...fieldProps} className={FormFieldL.input()} />
    </div>
  );
};
