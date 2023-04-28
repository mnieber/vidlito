import { FormField_ } from 'src/forms/components/FormField';
import { useFieldProps } from 'src/forms/hooks';
import { cln } from 'src/utils/classnames';

type PropsT = {
  className?: any;
  placeholder?: string;
};

export const EmailField = (props: PropsT) => {
  const fieldProps = useFieldProps({ fieldType: 'text' });

  return (
    <div
      className={cln(
        'EmailField',
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
