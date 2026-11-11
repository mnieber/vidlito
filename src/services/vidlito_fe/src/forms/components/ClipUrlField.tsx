import React from 'react';
import { useFormStateContext } from 'react-form-state-context';
import { TextField } from '/src/forms/components/TextField';
import { FieldPropsT } from '/src/forms/hooks';

// Import styles
import './TextField.scss';

type PropsT = Partial<FieldPropsT> & {
  slugFieldName?: string;
  updateSlugField?: boolean;
  className?: any;
};

export const ClipUrlField = (props: PropsT) => {
  const formState = useFormStateContext();

  const { onChange, ...otherProps } = props;

  const onChangeExt = (e: any) => {
    let url = e.target.value ?? '';
    let startTimeS = 0;

    // If value ends in t=<time>, then set the startTime field and
    // set the url field to the remainder.
    const timeMatch = url.match(/\?t=(\d+)/);
    if (timeMatch) {
      url = url.slice(0, timeMatch.index);
      startTimeS = parseInt(timeMatch[1]);
      formState.setValue('clipForm.startTimeS', startTimeS);
      formState.setValue('clipForm.url', url);
    }

    if (props.onChange) {
      props.onChange(e);
    }
  };

  React.useEffect(() => {
    onChangeExt({ target: { value: formState.values['clipForm.url'] } });
  }, []);

  return <TextField {...otherProps} onChange={onChangeExt} />;
};
