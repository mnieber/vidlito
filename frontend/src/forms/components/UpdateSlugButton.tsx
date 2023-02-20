import { useFormStateContext } from 'react-form-state-context';
import { useFormFieldContext } from 'src/forms/components/FormFieldContext';
import { smallButton } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { slugify } from 'src/utils/slugify';

export type PropsT = {
  className?: any;
  tabIndex?: number;
  relatedFieldName: string;
};

export const UpdateSlugButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const fieldContext = useFormFieldContext();

  return (
    <div
      tabIndex={props.tabIndex ?? -1}
      className={cn('UpdateSlugButton', smallButton, props.className)}
      onClick={() => {
        const newSlug = slugify(formState.values[props.relatedFieldName]);
        if (newSlug) {
          formState.setValue(fieldContext.fieldName, newSlug);
        }
      }}
    >
      Update
    </div>
  );
};
