import { useObservableMutation } from '/src/api/ObservableMutation';
import { authPost } from '/src/api/restClient';
import { authUrl } from '/src/api/utils/allauth';
import { AuthState } from '/src/auth/AuthState';
import { getInvalidFieldsResult } from '/src/auth/endpoints/utils';
import { ObjT } from '/src/utils/types';

export type ArgsT = {
  key: string;
  password: string;
};

export function resetPassword(args: ArgsT) {
  return authPost(`${authUrl}/password/reset`, {
    key: args.key,
    password: args.password,
  }).then(
    () => ({ success: true, errors: [] }),
    (error: any) =>
      // The password is changed, and the user is not signed in
      error.response?.status === 401
        ? { success: true, errors: [] }
        : getInvalidFieldsResult(error)
  );
}

export const useResetPassword = (authState?: AuthState) => {
  const queryName = 'resetPassword';

  return useObservableMutation({
    mutationFn: resetPassword,
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
