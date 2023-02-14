import { useQuery } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistId?: string;
  playlistSlug?: string;
};

export const getPlaylist = (args: ArgsT) => {
  return doQuery(
    `query getPlaylist(
      $playlistId: ID
      $playlistSlug: String
    ) {
      getPlaylist(
        playlistId: $playlistId
        playlistSlug: $playlistSlug
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
          }
          owner {
            displayName
            userId
          }
        }
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.getPlaylist
    );
  });
};

export const useGetPlaylist = (args: ArgsT) => {
  return useQuery({
    queryKey: ['getPlaylist', args],
    queryFn: () => getPlaylist(args),
    enabled: !!args.playlistId || !!args.playlistSlug,
  });
};
