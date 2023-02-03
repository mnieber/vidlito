import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { AuthState } from 'src/auth/AuthState';
import { States } from 'src/auth/endpoints/states';
import { isError } from 'src/auth/endpoints/utils';
import { ObjT } from 'src/utils/types';

export type ArgsT = {
  userId: string;
  acceptsTerms: boolean;
  termsVersionAccepted: string;
};

export function signUp(args: ArgsT) {
  return doQuery(
    `mutation (
      $email: String!,
      $acceptsTerms: Boolean!,
      $termsVersionAccepted: String!
    ) {
      registerAccount(
        email: $email,
        acceptsTerms: $acceptsTerms,
        termsVersionAccepted: $termsVersionAccepted,
      ) {
        success,
        activationToken,
        errors,
      }
    }`,
    {
      email: args.userId,
      acceptsTerms: args.acceptsTerms,
      termsVersionAccepted: args.termsVersionAccepted,
    }
  ).then((response: ObjT) => {
    if (isError(['registerAccount', 'errors'])(response))
      return {
        success: false,
        errors: [States.SIGN_UP_FAILED],
      };

    return {
      success: true,
      activationToken: response.registerAccount.activationToken,
    };
  });
}

export const useSignUp = (authState?: AuthState) => {
  const queryName = 'signUp';

  return useMutation({
    mutationKey: ['signUp'],
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
