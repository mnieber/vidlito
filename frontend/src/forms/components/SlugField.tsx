import { UpdateSlugButton } from 'src/forms/components';
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
    <div className={cn('SlugField', rowBanner, props.className)}>
      <input {...{ ...fieldProps, className: cn('pt-1 pb-2 px-2') }} />
      <UpdateSlugButton
        className={cn('px-2', 'bg-gray-500 text-blue-50 font-bold rounded-lg')}
        tabIndex={props.tabIndex}
        key="1"
        relatedFieldName={props.relatedFieldName}
      />
    </div>
  );
};
