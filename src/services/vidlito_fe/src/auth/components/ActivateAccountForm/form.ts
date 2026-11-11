import { FormState } from 'react-form-state-context';
import { formFields as ff, PropsT } from './index';
import { States } from '/src/auth/endpoints/states';
import { createFormErrorsObject } from '/src/forms/utils/createFormErrorsObject';
import { ObjT } from '/src/utils/types';

const getExternalErrors = (messages: ObjT, errors: Array<string>) => {
  const fieldErrors = createFormErrorsObject();

  if (errors?.includes(States.USERNAME_ALREADY_TAKEN)) {
    fieldErrors[ff.username] = messages.divUsernameAlreadyTaken;
  }
  if (errors?.includes(States.PASSWORD_TOO_SHORT)) {
    fieldErrors[ff.password] = messages.divSorryThatPasswordIsTooShort;
  }
  if (errors?.includes(States.ACTIVATION_TOKEN_NOT_FOUND)) {
    fieldErrors['global'] = messages.divTheActivationFailed;
  }
  if (errors?.includes(States.ACTIVATE_ACCOUNT_FAILED)) {
    fieldErrors['global'] = messages.divSorryTechnicalError;
  }
  return fieldErrors;
};

const getInitialValues = () => {
  return {
    [ff.password]: null,
    [ff.username]: null,
  };
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
      setError(ff.password, messages.pleaseProvideANewPassword);
    } else if (values.username) {
      setError(ff.username, messages.pleaseProvideANewUsername);
    } else if (values.password.length < 8) {
      setError(ff.password, messages.sorryThatPasswordIsTooShort);
    }
  };

const getHandleSubmit =
  (props: PropsT) =>
  ({ values }: { values: FormState['values'] }) => {
    return props.activateAccount(values[ff.username], values[ff.password]);
  };

export const form = {
  getExternalErrors,
  getInitialValues,
  getHandleValidate,
  getHandleSubmit,
};
