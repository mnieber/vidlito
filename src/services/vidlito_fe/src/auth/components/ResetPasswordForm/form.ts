import { FormState } from 'react-form-state-context';
import { formFields as ff, PropsT } from './index';
import { AllauthFieldErrorsT } from '/src/api/utils/allauth';
import { States } from '/src/auth/endpoints/states';
import { addAllauthFieldErrors } from '/src/auth/utils/addAllauthFieldErrors';
import { createFormErrorsObject } from '/src/forms/utils/createFormErrorsObject';
import { ObjT } from '/src/utils/types';

export const getExternalErrors = (
  messages: ObjT,
  errors: Array<string>,
  allauthFieldErrors?: AllauthFieldErrorsT
) => {
  const fieldErrors = createFormErrorsObject();

  if (errors?.includes(States.INVALID_FIELDS)) {
    // An invalid or expired key means that the link can't be used anymore
    if (allauthFieldErrors?.key) {
      fieldErrors['global'] = messages.divSorryWeCouldNotResetThePassword;
    }
    addAllauthFieldErrors(fieldErrors, allauthFieldErrors, {
      password: ff.password,
    });
  }
  if (errors?.includes(States.RESET_PASSWORD_FAILED)) {
    fieldErrors['global'] = messages.divSorryThereSeemsToBeATechnicalProblem;
  }
  return fieldErrors;
};

const getInitialValues = () => {
  return { [ff.password]: null };
};

const getHandleValidate =
  (messages: ObjT) =>
  ({
    values,
    setError,
  }: {
    values: FormState['values'];
    setError: FormState['setError'];
  }) => {
    if (!values.password) {
      setError('password', messages.divPleaseProvideANewPassword);
    }
  };

const getHandleSubmit =
  (props: PropsT) =>
  ({ values }: { values: FormState['values'] }) => {
    return props.resetPassword(values.password);
  };

export const form = {
  getExternalErrors,
  getInitialValues,
  getHandleValidate,
  getHandleSubmit,
};
