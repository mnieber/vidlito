import React from 'react';
import { setOnRequestFailed } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { AuthState } from '/src/auth/AuthState';
import {
  invalidateLoadUserId,
  loadSessionUserId,
  loadUserIdQueryKey,
} from '/src/auth/endpoints/queries';
import { States } from '/src/auth/endpoints/states';
import { navToSignIn } from '/src/frames/navFunctions';
import { history } from '/src/routes/history';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export const AuthStateContext = React.createContext<AuthState | undefined>(
  undefined
);

type PropsT = React.PropsWithChildren<{}>;

// When a GraphQL request fails while the user is signed in, we check whether the
// session has expired. If so, the user signs in again, and then returns to this page.
const handleRequestFailed = () => {
  const data: any = queryClient.getQueryData(loadUserIdQueryKey({}));
  if (!data?.isAuthenticated) return;

  loadSessionUserId().then(
    (userId) => {
      if (!userId) {
        // The anonymous user must not see the results of the previous user
        queryClient.getQueryCache().clear();
        invalidateLoadUserId({});
        navToSignIn(history.location.pathname);
      }
    },
    () => {}
  );
};

export const AuthStateProvider = (props: PropsT) => {
  const authState = useBuilder(() => new AuthState(States.INITIAL));

  React.useEffect(() => {
    setOnRequestFailed(handleRequestFailed);
  }, []);

  return (
    <AuthStateContext.Provider value={authState}>
      {props.children}
    </AuthStateContext.Provider>
  );
};
