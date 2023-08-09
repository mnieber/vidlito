import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { getPlaylistQueryKey } from '/src/api/queries';
import { playlistFields } from '/src/api/queries/useGetPlaylist';
import { queryClient } from '/src/api/queryClient';
import { PlaylistFormT } from '/src/api/types/PlaylistT';
import { loadUserIdQueryKey } from '/src/auth/endpoints';
import { applyUpdate } from '/src/utils/applyUpdate';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistForm: PlaylistFormT;
  parentPlaylistId?: string;
};

export const savePlaylist = (args: ArgsT) => {
  return doQuery(
    `mutation savePlaylist(
      $playlistForm: PlaylistFormT!
    ) {
      savePlaylist(
        playlistForm: $playlistForm
      ) {
        errors
        success
        created
        playlist {
          ${playlistFields}
        }
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(!!import.meta.env.DEV ? 1000 : 0, response.savePlaylist);
  });
};

export const useSavePlaylist = () => {
  return useObservableMutation({
    mutationFn: savePlaylist,
    onSuccess: (response: ObjT, args: ArgsT) => {
      // To avoid showing a loader, we populate the cache with the playlist that was just saved.
      // This means that if the playlistStateProvider calls getPlaylist, then this will be treated
      // as an update and not as a load.
      queryClient.setQueryData(
        getPlaylistQueryKey({
          playlistSlug: response.playlist.slug,
        }),
        (data: any) => {
          return data
            ? applyUpdate(['playlist'], data, () => response.playlist)
            : { playlist: response.playlist };
        }
      );

      const invalidateLoadUserId = response.created
        ? [queryClient.invalidateQueries({ queryKey: loadUserIdQueryKey({}) })]
        : [];
      return Promise.all([
        ...invalidateLoadUserId,
        queryClient.invalidateQueries({
          queryKey: getPlaylistQueryKey(),
        }),
      ]);
    },
  });
};
