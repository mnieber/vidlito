import { FormState } from 'react-form-state-context';
import { formFields as ff, PropsT } from './index';
import { AllauthFieldErrorsT } from '/src/api/utils/allauth';
import { States } from '/src/auth/endpoints/states';
import { addAllauthFieldErrors } from '/src/auth/utils/addAllauthFieldErrors';
import { createFormErrorsObject } from '/src/forms/utils/createFormErrorsObject';
import { ObjT } from '/src/utils/types';

const getInitialValues = () => {
  return {
    [ff.acceptsTerms]: false,
    [ff.email]: null,
    [ff.username]: null,
    [ff.password]: null,
  };
};

const getExternalErrors = (
  messages: ObjT,
  errors: Array<string>,
  allauthFieldErrors?: AllauthFieldErrorsT
) => {
  const fieldErrors = createFormErrorsObject();

  if (errors?.includes(States.INVALID_FIELDS)) {
    addAllauthFieldErrors(fieldErrors, allauthFieldErrors, {
      email: ff.email,
      password: ff.password,
      profile_username: ff.username,
      accepts_terms: ff.acceptsTerms,
    });
  }

  if (errors?.includes(States.SIGN_UP_FAILED)) {
    fieldErrors['global'] = messages.divSorryThereSeemsToBeATechnicalProblem;
  }
  return fieldErrors;
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
    if (!values[ff.email]) {
      setError(ff.email, messages.divPleaseEnterYourEmailAddress);
    }
    if (!values[ff.username]) {
      setError(ff.username, messages.divPleaseChooseAUsername);
    }
    if (!values[ff.password]) {
      setError(ff.password, messages.divPleaseChooseAPassword);
    }
    if (!values[ff.acceptsTerms]) {
      setError(
        ff.acceptsTerms,
        messages.divYouNeedToAcceptTheTermsAndConditions
      );
    }
  };

const getHandleSubmit =
  (props: PropsT) =>
  ({ values }: { values: FormState['values'] }) => {
    return props.signUp(
      values[ff.email],
      values[ff.username],
      values[ff.password],
      values[ff.acceptsTerms]
    );
  };

export const form = {
  getExternalErrors,
  getInitialValues,
  getHandleValidate,
  getHandleSubmit,
};
