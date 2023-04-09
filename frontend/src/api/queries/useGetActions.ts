import { useQuery } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { queryClient } from 'src/api/queryClient';
import { createQueryKey } from 'src/utils/createQueryKey';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistId?: string;
};

export const getActions = (args: ArgsT) => {
  return doQuery(
    `query getActions(
      $playlistId: UUID
    ) {
      getActions(
        playlistId: $playlistId
      ) {
        actionSet {
          data
          id
          type
          playlistId
        }
      }
    }`,
    args
  )
    .then((response: ObjT) => {
      return wait(
        process.env.NODE_ENV === 'development' ? 1000 : 0,
        response.getActions
      );
    })
    .then((response: ObjT) => {
      response.actionSet.forEach((action: ObjT) => {
        action.data = JSON.parse(action.data);
      });
      return response;
    });
};

// Note that the username is included in the query key so that
// the query is invalidated when the user signs in or out.
export type QueryKeyT = ArgsT & { username?: string };

export function queryKey(args: QueryKeyT) {
  return createQueryKey<QueryKeyT>('getActions', args);
}

export const useGetActions = (args: ArgsT & { username?: string }) => {
  return useQuery({
    queryKey: queryKey(args),
    queryFn: () => getActions(args),
  });
};

export const invalidateGetActions = (args: ArgsT) => {
  return queryClient.invalidateQueries({
    queryKey: queryKey({ playlistId: args.playlistId }),
  });
};
