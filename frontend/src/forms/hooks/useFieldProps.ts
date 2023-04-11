import React from 'react';
import {
  createFormFieldProps,
  FormState,
  useFormStateContext,
} from 'react-form-state-context';
import {
  FormFieldContextPropsT,
  useFormFieldContext,
} from 'src/forms/components';
import { handleEnterAsTabToNext } from 'src/forms/utils';

type FieldTypeT = 'checkbox' | 'text' | 'password';

export type FieldPropsT = {
  controlled?: boolean;
  disabled?: boolean;
  fieldType: FieldTypeT;
  onAnimationStart?: (e: React.AnimationEvent<HTMLDivElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoSelect?: boolean;
  tabIndex?: number;
};

export const useFieldProps = (props: FieldPropsT) => {
  const formState = useFormStateContext();
  const fieldContext = useFormFieldContext();

  const formFieldProps = React.useMemo(
    () =>
      createFormFieldProps({
        formState,
        fieldName: fieldContext.fieldName,
        fieldType: props.fieldType,
        onChange: props.onChange,
        controlled: props.controlled,
      }),
    [formState, fieldContext, props.fieldType, props.onChange, props.controlled]
  );

  const onAnimationStart = props.onAnimationStart;

  const handleAnimationStart = React.useMemo(
    () => (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.animationName === 'onAutoFillStart') {
        // We set a value to trigger the smart label. This value
        // will be replaced by the autofill value.
        formState.setValue(fieldContext.fieldName, ' ');
      }
      if (onAnimationStart) {
        onAnimationStart(e);
      }
    },
    [fieldContext, formState, onAnimationStart]
  );

  return {
    ...formFieldProps,
    onAnimationStart: handleAnimationStart,
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      if (props.autoSelect) {
        e.target.select();
      }
      props.onFocus && props.onFocus(e);
    },
    onBlur: props.onBlur,
    onKeyDown: handleKeyDown(fieldContext, formState),
    placeholder:
      props.placeholder ??
      (fieldContext.useSmartLabel ? fieldContext.label : undefined),
    autoFocus: fieldContext.autoFocus,
    disabled: props.disabled,
    tabIndex: props.tabIndex,
  };
};

export function handleKeyDown(
  fieldContext: FormFieldContextPropsT,
  formState: FormState
) {
  return (e: any) => {
    if (fieldContext.submitOnEnter && e.keyCode === 13) {
      formState.submit();
    } else if (fieldContext.tabOnEnter ?? true) {
      handleEnterAsTabToNext(e);
    }
  };
}
