import * as R from 'ramda';
import { useFormStateContext } from 'react-form-state-context';
import { useFormFieldContext } from 'src/forms/components';
import { TextField } from 'src/forms/components/TextField';
import { FieldPropsT } from 'src/forms/hooks';
import { slugify } from 'src/utils';
import './TextField.scss';

type PropsT = Partial<FieldPropsT> & {
  slugFieldName?: string;
  updateSlugField?: boolean;
  className?: any;
};

export const NameField = (props: PropsT) => {
  const formState = useFormStateContext();
  const fieldContext = useFormFieldContext();

  return (
    <TextField
      {...props}
      onBlur={() => {
        if (!R.isNil(props.slugFieldName)) {
          formState.setValue(
            props.slugFieldName,
            slugify(formState.getValue(fieldContext.fieldName))
          );
        }
      }}
    />
  );
};
