import { UpdateSlugButton } from 'src/forms/components';
import { FormField_ } from 'src/forms/components/FormField';
import { FieldPropsT, useFieldProps } from 'src/forms/hooks';
import { rowBanner } from 'src/frames/components';
import { cn } from 'src/utils/classnames';

type PropsT = Partial<FieldPropsT> & {
  className?: any;
  relatedFieldName: string;
};

export const SlugField = (props: PropsT) => {
  const fieldProps = useFieldProps({
    ...props,
    fieldType: props.fieldType ?? 'text',
    disabled: true,
    controlled: true,
  });

  return (
    <div className={cn('SlugField', FormField_.root, props.className)}>
      <div className={cn(rowBanner)}>
        <input {...fieldProps} className={FormField_.input} />
        <UpdateSlugButton
          className={cn(
            'px-2',
            'bg-gray-100 text-primaryTeal font-bold m-0.5 rounded-lg'
          )}
          tabIndex={props.tabIndex}
          key="1"
          relatedFieldName={props.relatedFieldName}
        />
      </div>
    </div>
  );
};
