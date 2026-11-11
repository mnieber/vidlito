import { AllauthFieldErrorsT } from '/src/api/utils/allauth';
import { ObjT } from '/src/utils/types';

// Adds the messages of allauth to the errors of a form. The fieldNameByParam maps
// the field names of allauth (e.g. accepts_terms) to those of the form (e.g.
// acceptsTerms). An error of a field that the form doesn't have (e.g. the key from
// the link in the email) is shown as the global error of the form.
export const addAllauthFieldErrors = (
  formErrors: ObjT,
  fieldErrors: AllauthFieldErrorsT | undefined,
  fieldNameByParam: Record<string, string>
) => {
  Object.entries(fieldErrors ?? {}).forEach(([param, message]) => {
    const fieldName = fieldNameByParam[param] ?? 'global';
    formErrors[fieldName] ??= message;
  });
  return formErrors;
};
