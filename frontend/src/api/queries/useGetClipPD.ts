import { useQuery } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { createQueryKey } from '/src/utils/createQueryKey';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  clipSlug?: string;
};

export const getClipPD = (args: ArgsT) => {
  return doQuery(
    `query getClipPD(
      $clipSlug: String
    ) {
      getClipPD(
        clipSlug: $clipSlug
      ) {
        clipPD {
          description
          tags
        }
      }
    }`,
    args
  )
    .then((response: ObjT) => {
      return wait(import.meta.env.DEV ? 1000 : 0, response.getClipPD);
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
  return createQueryKey<QueryKeyT>('getClipPD', args);
}

export const useGetClipPD = (args: ArgsT, options?: OptionsT) => {
  return useQuery({
    queryKey: queryKey(args),
    enabled: !!(options?.enabled ?? true),
    queryFn: () => getClipPD(args),
  });
};
