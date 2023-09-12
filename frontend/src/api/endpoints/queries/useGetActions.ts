import { useQuery } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { usePaginationChanged } from '/src/api/pagination/hooks/usePaginationChanged';
import {
  omitPaginationArgs,
  OmitPaginationArgs,
} from '/src/api/pagination/types';
import { createPaginatedQueryKey } from '/src/api/pagination/utils/createPaginatedQueryKey';
import { queryClient } from '/src/api/queryClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistId?: string;
  page: number;
  pageSize: number;
};

export const getActions = (args: ArgsT) => {
  return doQuery(
    `query getActions(
      $playlistId: UUID
      $page: Int!
      $pageSize: Int!
    ) {
      getActions(
        playlistId: $playlistId
        page: $page
        pageSize: $pageSize
      ) {
        actionSet {
          data
          id
          type
          playlistId
        }
        pagination {
          nrOfItems
          pageSize
          page
        }
      }
    }`,
    args
  )
    .then((response: ObjT) => {
      return wait(import.meta.env.DEV ? 1000 : 0, response.getActions);
    })
    .then((response: ObjT) => {
      response.actionSet.forEach((action: ObjT) => {
        action.data = JSON.parse(action.data);
      });
      return response;
    });
};

export type QueryKeyT = ArgsT;
export function queryKey(args: QueryKeyT) {
  return createPaginatedQueryKey('getActions', args);
}

export type OptionsT = {
  enabled?: boolean;
};

export const useGetActions = (args: ArgsT, options?: OptionsT) => {
  const paginationChanged = usePaginationChanged(args);
  if (paginationChanged && queryClient.getQueryData(queryKey(args))) {
    invalidateGetActions(args);
  }

  return useQuery({
    queryKey: queryKey(args),
    queryFn: () => getActions(args),
    enabled: !!(options?.enabled ?? true),
  });
};

// Version of queryKey that does not include pagination args
export type QueryKeyWithoutPaginationT = OmitPaginationArgs<QueryKeyT>;
export function queryKeyWithoutPagination(args: QueryKeyWithoutPaginationT) {
  return createPaginatedQueryKey('getActions', omitPaginationArgs(args));
}

export const invalidateGetActions = (args: QueryKeyWithoutPaginationT) => {
  return queryClient.invalidateQueries({
    queryKey: queryKeyWithoutPagination(args),
  });
};
