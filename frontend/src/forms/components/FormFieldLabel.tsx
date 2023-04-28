import { isEmpty, isNil } from 'ramda';
import React from 'react';
import { useFormFieldContext } from 'src/forms/components';
import { rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';

type PropsT = {
  className?: any;
  label: string;
  buttons?: any[];
};

export const FormFieldLabel = (props: PropsT) => {
  const fieldContext = useFormFieldContext();

  const RowWrapper =
    isNil(props.buttons) || isEmpty(props.buttons)
      ? ({ children }: any) => <React.Fragment>{children}</React.Fragment>
      : ({ children }: any) => (
          <div className={cn('FormFieldLabel', rowSkewer)}>{children}</div>
        );

  return (
    <RowWrapper>
      {props.label && (
        <label
          className={cn('FormFieldLabel', props.className)}
          htmlFor={fieldContext.fieldName}
        >
          {props.label}
        </label>
      )}
      {props.buttons?.length && <div className="flex-grow" />}
      {props.buttons?.length && (
        <div className={cn('FormFieldLabel__Buttons', 'flex flex-row', 'ml-2')}>
          {props.buttons}
        </div>
      )}
    </RowWrapper>
  );
};
