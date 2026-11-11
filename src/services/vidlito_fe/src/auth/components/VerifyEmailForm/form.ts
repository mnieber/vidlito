import { AllauthFieldErrorsT } from '/src/api/utils/allauth';
import { States } from '/src/auth/endpoints/states';
import { createFormErrorsObject } from '/src/forms/utils/createFormErrorsObject';
import { PropsT } from './index';
import { ObjT } from '/src/utils/types';

const getExternalErrors = (
  messages: ObjT,
  errors: Array<string>,
  allauthFieldErrors?: AllauthFieldErrorsT
) => {
  const fieldErrors = createFormErrorsObject();

  if (errors?.includes(States.INVALID_FIELDS)) {
    // The key of the link is invalid, or it has expired
    fieldErrors['global'] = messages.divTheVerificationFailed;
  }
  if (errors?.includes(States.VERIFY_EMAIL_FAILED)) {
    fieldErrors['global'] = messages.divSorryTechnicalError;
  }
  return fieldErrors;
};

const getInitialValues = () => {
  return {};
};

const getHandleValidate = () => () => {};

const getHandleSubmit = (props: PropsT) => () => {
  return props.verifyEmail();
};

export const form = {
  getExternalErrors,
  getInitialValues,
  getHandleValidate,
  getHandleSubmit,
};
