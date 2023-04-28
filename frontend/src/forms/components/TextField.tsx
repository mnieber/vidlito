import { FormField_ } from 'src/forms/components/FormField';
import { FieldPropsT, useFieldProps } from 'src/forms/hooks';
import { cln } from 'src/utils/classnames';
import './TextField.scss';

type PropsT = Partial<FieldPropsT> & {
  className?: any;
};

export const TextField = (props: PropsT) => {
  const fieldProps = useFieldProps({
    ...props,
    fieldType: props.fieldType ?? 'text',
  });

  return (
    <div
      className={cln(
        'TextField',
        FormField_.root
      )(
        //
        props.className
      )}
    >
      <input {...fieldProps} className={FormField_.input} />
    </div>
  );
};
