import { useQuery } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistSlugId?: string;
};

export const getActions = (args: ArgsT) => {
  return doQuery(
    `query getActions(
      $playlistSlugId: String
    ) {
      getActions(
        playlistSlugId: $playlistSlugId
      ) {
        actionSet {
          data
          id
          type
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

export const useGetActions = (args: ArgsT) => {
  return useQuery({
    queryKey: ['getActions', args],
    queryFn: () => getActions(args),
    enabled: !!args.playlistSlugId,
  });
};
