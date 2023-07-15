import { useQuery } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { createQueryKey } from '/src/utils/createQueryKey';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  clipSlug?: string;
};

export const getClipPd = (args: ArgsT) => {
  return doQuery(
    `query getClipPd(
      $clipSlug: String
    ) {
      getClipPd(
        clipSlug: $clipSlug
      ) {
        clipPd {
          description
          tags
        }
      }
    }`,
    args
  )
    .then((response: ObjT) => {
      return wait(import.meta.env.DEV ? 1000 : 0, response.getClipPd);
    })
    .then((response: ObjT) => {
      return response;
    });
};

export type QueryKeyT = ArgsT;

export type OptionsT = {
  enabled?: boolean;
};

export function queryKey(args: QueryKeyT) {
  return createQueryKey<QueryKeyT>('getClipPd', args);
}

export const useGetClipPd = (args: ArgsT, options?: OptionsT) => {
  return useQuery({
    queryKey: queryKey(args),
    enabled: !!(options?.enabled ?? true),
    queryFn: () => getClipPd(args),
  });
};
