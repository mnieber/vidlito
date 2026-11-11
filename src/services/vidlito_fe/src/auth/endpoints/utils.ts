import { getAllauthFieldErrors } from '/src/api/utils/allauth';
import { States } from '/src/auth/endpoints/states';

// Returns the result of a request that allauth refused because of the values of the
// form (a 400 with errors), and throws any other error (e.g. a network error).
export const getInvalidFieldsResult = (error: any) => {
  const fieldErrors = getAllauthFieldErrors(error.response?.data);
  if (error.response?.status !== 400 || Object.keys(fieldErrors).length === 0) {
    throw error;
  }
  return {
    success: false,
    errors: [States.INVALID_FIELDS],
    fieldErrors,
  };
};
