import { useQuery } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistSlug?: string;
};

export const getActions = (args: ArgsT) => {
  return doQuery(
    `query getActions(
      $playlistSlug: String
    ) {
      getActions(
        playlistSlug: $playlistSlug
      ) {
        actionSet {
          data
          id
          playlistId
          teaser
          type
        }
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.getActions
    );
  });
};

export const useGetActions = (args: ArgsT) => {
  return useQuery({
    queryKey: ['getActions', args],
    queryFn: () => getActions(args),
    enabled: !!args.playlistSlug,
  });
};
