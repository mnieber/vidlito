import { useObservableMutation } from '/src/api/ObservableMutation';
import { queryClient } from '/src/api/queryClient';
import { authDelete } from '/src/api/restClient';
import { authUrl } from '/src/api/utils/allauth';
import { AuthState } from '/src/auth/AuthState';
import { ObjT } from '/src/utils/types';

export type ArgsT = {};

export function signOut(args: ArgsT) {
  return authDelete(`${authUrl}/session`).then(
    () => ({ errors: [] }),
    (error: any) => {
      // Allauth answers 401 when the session has ended
      if (error.response?.status === 401) return { errors: [] };
      throw error;
    }
  );
}

export const useSignOut = (authState?: AuthState) => {
  const queryName = 'signOut';

  return useObservableMutation({
    mutationFn: signOut,
    onMutate: () => {
      if (authState) authState.onUpdating(queryName);
    },
    onSuccess: (data: ObjT) => {
      // We completely clear the query cache so that the anonymous user
      // will never see results from the previous user.
      queryClient.getQueryCache().clear();
      if (authState) authState.onUpdated(queryName, data);
    },
    onError: (error: Error) => {
      if (authState) authState.onErrored(queryName, error.message);
    },
  });
};
