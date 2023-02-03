import { useQuery } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { useQueryData } from 'src/api/hooks';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistId: string;
};

export const getPlaylist = (args: ArgsT) => {
  return doQuery(
    `query getPlaylist(
      $playlistId: ID!
    ) {
      getPlaylist(
        playlistId: $playlistId
      ) {
        playlist {
          description
          id
          loaded
          name
          slug
          clipSet {
            description
            endTimeMs
            id
            name
            slug
            startTimeMs
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
  const query = useQuery(['getPlaylist', args], () => getPlaylist(args));
  return useQueryData(query);
};
