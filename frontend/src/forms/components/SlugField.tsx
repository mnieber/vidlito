import { UpdateSlugButton } from '/src/forms/components';
import { FormFieldL } from '/src/forms/components/FormField';
import { FieldPropsT, useFieldProps } from '/src/forms/hooks';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

type PropsT = Partial<FieldPropsT> & {
  className?: any;
  relatedFieldName: string;
};

export const SlugField = (props: PropsT) => {
  const { relatedFieldName, ...otherProps } = props;
  const fieldProps = useFieldProps({
    ...otherProps,
    fieldType: props.fieldType ?? 'text',
    disabled: true,
    controlled: true,
  });
  return (
    <div className={cn('SlugField', [], [FormFieldL.root(), props.className])}>
      <div className={cn(L.row.banner())}>
        <input {...fieldProps} className={FormFieldL.input()} />
        <UpdateSlugButton
          className={FormFieldL.button.root()}
          tabIndex={props.tabIndex}
          key="1"
          relatedFieldName={relatedFieldName}
        />
      </div>
    </div>
  );
};
