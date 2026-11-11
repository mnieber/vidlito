import { useQuery } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { createQueryKey } from '/src/utils/createQueryKey';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export const clipFields = `
            description
            endTimeMs
            id
            name
            nrOfPublicPlaylists
            nrOfPrivatePlaylists
            slug
            startTimeMs
            tags
            url
            ownerUsername
`;

export const playlistFields = `
          description
          id
          name
          slug
          tags
          nrOfClips
          clipSet {
            ${clipFields}
          }
          ownerUsername
          isPublic
`;

export type ArgsT = {
  playlistSlug?: string;
};

export const getPlaylist = (args: ArgsT) => {
  return doQuery(
    `query getPlaylist(
      $playlistSlug: String
    ) {
      getPlaylist(
        playlistSlug: $playlistSlug
      ) {
        playlist {
          ${playlistFields}
        }
        playlistPd {
          description
          tags
        }
      }
    }`,
    args
  ).then((response: ObjT) => {
    if (response.getPlaylist.playlist) {
      response.getPlaylist.playlist.playlistPd =
        response.getPlaylist.playlistPd;
    }
    response.getPlaylist.playlistPd = undefined;
    return wait(import.meta.env.DEV ? 1000 : 0, response.getPlaylist);
  });
};

export type QueryKeyT = {
  playlistSlug?: string;
};

export function queryKey(args?: QueryKeyT) {
  return createQueryKey<QueryKeyT>('getPlaylist', args);
}

export type OptionsT = {
  enabled?: boolean;
  onError?: (error: unknown) => void;
};

export const useGetPlaylist = (args: ArgsT, options?: OptionsT) => {
  return useQuery({
    queryKey: queryKey(args),
    queryFn: () => getPlaylist(args),
    retry: 0,
    enabled: !!(options?.enabled ?? true),
    onError: options?.onError,
  });
};

export const invalidateGetPlaylist = (args: QueryKeyT) => {
  return queryClient.invalidateQueries({
    queryKey: queryKey(args),
  });
};
