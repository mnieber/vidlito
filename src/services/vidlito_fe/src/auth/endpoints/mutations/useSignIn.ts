import { useObservableMutation } from '/src/api/ObservableMutation';
import { authPost } from '/src/api/restClient';
import {
  authUrl,
  hasPendingFlow,
  parseAllauthErrors,
} from '/src/api/utils/allauth';
import { AuthState } from '/src/auth/AuthState';
import { invalidateLoadUserId } from '/src/auth/endpoints/queries';
import { States } from '/src/auth/endpoints/states';
import { ObjT } from '/src/utils/types';

export type ArgsT = {
  userId: string;
  password: string;
};

const getSignInFailure = (error: any) => {
  const data = error.response?.data;
  switch (error.response?.status) {
    case 400: {
      const isRateLimited = parseAllauthErrors(data).some(
        (x) => x.code === 'too_many_login_attempts'
      );
      return {
        success: false,
        errors: [
          isRateLimited ? States.TOO_MANY_ATTEMPTS : States.INVALID_CREDENTIALS,
        ],
      };
    }
    case 401:
      return {
        success: false,
        errors: [
          hasPendingFlow(data, 'verify_email')
            ? States.EMAIL_NOT_VERIFIED
            : States.INACTIVE_ACCOUNT,
        ],
      };
    case 409:
      // Already signed in (e.g. in another tab)
      return { success: true, errors: [] };
    default:
      throw error;
  }
};

export function signIn(args: ArgsT) {
  return authPost(`${authUrl}/login`, {
    email: args.userId,
    password: args.password,
  }).then(() => ({ success: true, errors: [] }), getSignInFailure);
}

export const useSignIn = (authState?: AuthState) => {
  const queryName = 'signIn';

  return useObservableMutation({
    mutationFn: signIn,
    onMutate: () => {
      if (authState) authState.onUpdating(queryName);
    },
    onSuccess: (data: ObjT) => {
      if (authState) authState.onUpdated(queryName, data);
      return invalidateLoadUserId({});
    },
    onError: (error: Error) => {
      if (authState) authState.onErrored(queryName, error.message);
    },
  });
};
