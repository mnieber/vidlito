import { useObservableMutation } from '/src/api/ObservableMutation';
import { authPost } from '/src/api/restClient';
import { authUrl } from '/src/api/utils/allauth';
import { AuthState } from '/src/auth/AuthState';
import { getInvalidFieldsResult } from '/src/auth/endpoints/utils';
import { ObjT } from '/src/utils/types';

export type ArgsT = {
  key: string;
};

export function verifyEmail(args: ArgsT) {
  return authPost(`${authUrl}/email/verify`, { key: args.key }).then(
    () => ({ success: true, errors: [] }),
    (error: any) =>
      // The email address is verified, and the user is not signed in
      error.response?.status === 401
        ? { success: true, errors: [] }
        : getInvalidFieldsResult(error)
  );
}

export const useVerifyEmail = (authState?: AuthState) => {
  const queryName = 'verifyEmail';

  return useObservableMutation({
    mutationFn: verifyEmail,
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
