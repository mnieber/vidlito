import { useObservableMutation } from '/src/api/ObservableMutation';
import { authPost } from '/src/api/restClient';
import { authUrl } from '/src/api/utils/allauth';
import { AuthState } from '/src/auth/AuthState';
import { getInvalidFieldsResult } from '/src/auth/endpoints/utils';
import { ObjT } from '/src/utils/types';

export type ArgsT = {
  userId: string;
  username: string;
  password: string;
  acceptsTerms: boolean;
};

export function signUp(args: ArgsT) {
  return authPost(`${authUrl}/signup`, {
    email: args.userId,
    password: args.password,
    // See the SignupForm of the backend
    profile_username: args.username,
    accepts_terms: args.acceptsTerms,
  }).then(
    () => ({ success: true, errors: [] }),
    (error: any) =>
      // The account exists now, and verifying the email address is the pending step
      error.response?.status === 401
        ? { success: true, errors: [] }
        : getInvalidFieldsResult(error)
  );
}

export const useSignUp = (authState?: AuthState) => {
  const queryName = 'signUp';

  return useObservableMutation({
    mutationFn: signUp,
    onMutate: () => {
      if (authState) authState.onUpdating(queryName);
    },
    onSuccess: (data: ObjT) => {
      if (authState) authState.onUpdated(queryName, data);
    },
    onError: (error: Error) => {
      if (authState) authState.onErrored(queryName, error.message);
    },
  });
};
