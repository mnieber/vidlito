import { useQuery } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { createQueryKey } from '/src/utils/createQueryKey';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistSlug?: string;
  playlistId?: string;
};

export const getPlaylist = (args: ArgsT) => {
  return doQuery(
    `query getPlaylist(
      $playlistSlug: String!
      $playlistId: UUID
    ) {
      getPlaylist(
        playlistSlug: $playlistSlug
        playlistId: $playlistId
      ) {
        playlist {
          description
          id
          name
          slug
          tags
          clipSet {
            description
            endTimeMs
            id
            name
            slug
            startTimeMs
            tags
            url
            owner {
              username
            }
          }
          owner {
            username
          }
        }
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.getPlaylist);
  });
};

export type QueryKeyT = {
  playlistSlug: string | null;
};

export function queryKey(args: QueryKeyT) {
  return createQueryKey<QueryKeyT>('getPlaylist', args);
}

export const useGetPlaylist = (args: ArgsT) => {
  return useQuery({
    queryKey: queryKey({ playlistSlug: args.playlistSlug ?? null }),
    queryFn: () => getPlaylist(args),
    enabled: !!args.playlistSlug,
  });
};
