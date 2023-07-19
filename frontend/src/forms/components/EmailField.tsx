import { FormFieldL } from '/src/forms/components/FormField';
import { useFieldProps } from '/src/forms/hooks';
import { cn } from '/src/utils/classnames';

type PropsT = {
  className?: any;
  placeholder?: string;
};

export const EmailField = (props: PropsT) => {
  const fieldProps = useFieldProps({ fieldType: 'text' });

  return (
    <div className={cn('EmailField', [], [FormFieldL.root(), props.className])}>
      <input
        placeholder={props.placeholder}
        {...fieldProps}
        className={FormFieldL.input()}
      />
    </div>
  );
};
