import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  url: string;
};

export const updateLastUrl = (args: ArgsT) => {
  return doQuery(
    `mutation updateLastUrl(
      $url: String!
    ) {
      updateLastUrl(
        url: $url
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(!!import.meta.env.DEV ? 1000 : 0, response.updateLastUrl);
  });
};

export const useUpdateLastUrl = () => {
  return useMutation({
    mutationKey: ['updateLastUrl'],
    mutationFn: updateLastUrl,
  });
};
