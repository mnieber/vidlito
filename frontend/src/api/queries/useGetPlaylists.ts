import { useQuery } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { useQueryData } from 'src/api/hooks';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {};

export const getPlaylists = (args: ArgsT) => {
  return doQuery(
    `query getPlaylists {
      getPlaylists {
        playlists {
          description
          id
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
      response.getPlaylists
    );
  });
};

export const useGetPlaylists = () => {
  const query = useQuery(['getPlaylists'], () => getPlaylists({}));
  return useQueryData(query);
};
