import { FormFieldL } from '/src/forms/components/FormField';
import { useFieldProps } from '/src/forms/hooks';
import { cn } from '/src/utils/classnames';

type PropsT = { placeholder?: string; className?: any };

export const PasswordField = (props: PropsT) => {
  const fieldProps = useFieldProps({
    fieldType: 'password',
    autoSelect: true,
  });
  return (
    <div
      className={cn('PasswordField', [], [FormFieldL.root(), props.className])}
    >
      <input
        placeholder={props.placeholder}
        {...fieldProps}
        className={FormFieldL.input()}
      />
    </div>
  );
};
