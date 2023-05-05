import { UpdateSlugButton } from 'src/forms/components';
import { FieldPropsT, useFieldProps } from 'src/forms/hooks';
import { L } from 'src/frames/layout';
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
  const l = L.FormField;

  return (
    <div
      className={cn(
        //
        'SlugField',
        l.root(),
        props.className
      )}
    >
      <div className={cn(L.row.banner())}>
        <input {...fieldProps} className={l.input()} />
        <UpdateSlugButton
          className={l.FormFieldButton.root()}
          tabIndex={props.tabIndex}
          key="1"
          relatedFieldName={props.relatedFieldName}
        />
      </div>
    </div>
  );
};
