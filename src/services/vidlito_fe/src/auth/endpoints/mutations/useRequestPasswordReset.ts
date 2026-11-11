import { useObservableMutation } from '/src/api/ObservableMutation';
import { authPost } from '/src/api/restClient';
import { authUrl } from '/src/api/utils/allauth';
import { AuthState } from '/src/auth/AuthState';
import { getInvalidFieldsResult } from '/src/auth/endpoints/utils';
import { ObjT } from '/src/utils/types';

export type ArgsT = {
  email: string;
};

export function requestPasswordReset(args: ArgsT) {
  return authPost(`${authUrl}/password/request`, { email: args.email }).then(
    () => ({ success: true, errors: [] }),
    getInvalidFieldsResult
  );
}

export const useRequestPasswordReset = (authState?: AuthState) => {
  const queryName = 'requestPasswordReset';

  return useObservableMutation({
    mutationFn: requestPasswordReset,
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
