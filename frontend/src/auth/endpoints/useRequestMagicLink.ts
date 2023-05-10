import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { AuthState } from '/src/auth/AuthState';
import { States } from '/src/auth/endpoints/states';
import { isError } from '/src/auth/endpoints/utils';
import { ObjT } from '/src/utils/types';

export type ArgsT = {
  userId: string;
};

export function requestMagicLink(args: ArgsT) {
  return doQuery(
    `mutation ($email: String!) {
      requestMagicLink(
        email: $email,
      ) {
        success,
        errors,
        magicLinkToken
      }
    }`,
    {
      email: args.userId,
    }
  ).then((response: ObjT) => {
    if (isError(['requestMagicLink', 'errors'])(response))
      return {
        success: false,
        errors: [States.REQUEST_MAGIC_LINK_FAILED],
      };

    return {
      success: true,
      magicLinkToken: response.requestMagicLink.magicLinkToken,
    };
  });
}

export const useRequestMagicLink = (authState?: AuthState) => {
  const queryName = 'requestMagicLink';

  return useMutation({
    mutationKey: [queryName],
    mutationFn: requestMagicLink,
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
