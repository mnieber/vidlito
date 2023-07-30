import { useQuery } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { createQueryKey } from '/src/utils/createQueryKey';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

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
          description
          id
          name
          slug
          tags
          nrOfClips
          clipSet {
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
          }
          ownerUsername
          isPublic
        }
        playlistPd {
          description
          tags
        }
      }
    }`,
    args
  ).then((response: ObjT) => {
    response.getPlaylist.playlist.playlistPd = response.getPlaylist.playlistPd;
    response.getPlaylist.playlistPd = undefined;
    return wait(import.meta.env.DEV ? 1000 : 0, response.getPlaylist);
  });
};

export type QueryKeyT = {
  playlistSlug?: string;
};

export type OptionsT = {
  enabled?: boolean;
  onError?: (error: unknown) => void;
};

export function queryKey(args?: QueryKeyT) {
  return createQueryKey<QueryKeyT>('getPlaylist', args);
}

export const useGetPlaylist = (args: ArgsT, options?: OptionsT) => {
  return useQuery({
    queryKey: queryKey(args),
    queryFn: () => getPlaylist(args),
    retry: 0,
    enabled: !!(options?.enabled ?? true),
    onError: options?.onError,
  });
};
