import { useFieldProps } from '/src/forms/hooks';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

type PropsT = { placeholder?: string; className?: any };

export const PasswordField = (props: PropsT) => {
  const fieldProps = useFieldProps({
    fieldType: 'password',
    autoSelect: true,
  });
  const l = L.FormField;

  return (
    <div
      className={cn(
        'PasswordField',
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
