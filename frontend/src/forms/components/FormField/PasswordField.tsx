import { FormField_ } from 'src/forms/components/FormField';
import { useFieldProps } from 'src/forms/hooks';
import { cln } from 'src/utils/classnames';

type PropsT = { placeholder?: string; className?: any };

export const PasswordField = (props: PropsT) => {
  const fieldProps = useFieldProps({
    fieldType: 'password',
    autoSelect: true,
  });

  return (
    <div
      className={cln(
        'PasswordField',
        FormField_.root
      )(
        //
        props.className
      )}
    >
      <input
        placeholder={props.placeholder}
        {...fieldProps}
        className={FormField_.input}
      />
    </div>
  );
};
