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
  playlistId?: string;
  playlistSlug?: string;
};

export const getPlaylist = (args: ArgsT) => {
  return doQuery(
    `query getPlaylist(
      $playlistId: UUID
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
          nrClips
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
  playlistId?: string;
  playlistSlug?: string;
};

export function queryKey(args: QueryKeyT) {
  return createQueryKey<QueryKeyT>('getPlaylist', args);
}

export const useGetPlaylist = (args: ArgsT) => {
  return useQuery({
    queryKey: queryKey(args),
    queryFn: () => getPlaylist(args),
    enabled: !!args.playlistId || !!args.playlistSlug,
    onSuccess: (response: ObjT) => {
      // If the playlist was loaded by slug,
      // then set the query data for loading it by id, and vice versa.
      const altQueryKeyArgs = args.playlistId
        ? { playlistSlug: response.playlist.slug }
        : { playlistId: response.playlist.id };
      queryClient.setQueriesData(
        { queryKey: queryKey(altQueryKeyArgs) },
        response
      );

      queryClient.setQueriesData(
        { queryKey: loadUserIdQueryKey({}) },
        (data: any) => {
          return applyUpdate(
            ['userProfile.followSet'],
            data,
            (playlists: PlaylistT[]) => {
              return playlists.map((playlist: PlaylistT) => {
                return playlist.id === response.playlist.id
                  ? response.playlist
                  : playlist;
              });
            }
          );
        }
      );
    },
  });
};
