import { useQuery } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { loadUserIdQueryKey } from '/src/auth/endpoints';
import { applyUpdate } from '/src/utils/applyUpdate';
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
    return wait(import.meta.env.DEV ? 1000 : 0, response.getPlaylist);
  });
};

export type QueryKeyT = {
  playlistSlug?: string;
};

export type OptionsT = {
  enabled?: boolean;
};

export function queryKey(args: QueryKeyT) {
  return createQueryKey<QueryKeyT>('getPlaylist', args);
}

export const useGetPlaylist = (args: ArgsT, options?: OptionsT) => {
  return useQuery({
    queryKey: queryKey(args),
    queryFn: () => getPlaylist(args),
    retry: 0,
    enabled: !!(options?.enabled ?? true),
    onSuccess: (response: ObjT) => {
      queryClient.setQueriesData(
        { queryKey: loadUserIdQueryKey({}) },
        (data: any) => {
          return data.userProfile
            ? applyUpdate(
                ['userProfile.followSet'],
                data,
                (playlists: PlaylistT[]) => {
                  return playlists.map((playlist: PlaylistT) => {
                    return playlist.id === response.playlist.id
                      ? response.playlist
                      : playlist;
                  });
                }
              )
            : data;
        }
      );
    },
  });
};
