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
};

export const getPlaylist = (args: ArgsT) => {
  return doQuery(
    `query getPlaylist(
      $playlistId: UUID!
    ) {
      getPlaylist(
        playlistId: $playlistId
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
  playlistId: string | null;
};

export function queryKey(args: QueryKeyT) {
  return createQueryKey<QueryKeyT>('getPlaylist', args);
}

export const useGetPlaylist = (args: ArgsT) => {
  return useQuery({
    queryKey: queryKey({ playlistId: args.playlistId ?? null }),
    queryFn: () => getPlaylist(args),
    enabled: !!args.playlistId,
    onSuccess: (response: ObjT) => {
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
