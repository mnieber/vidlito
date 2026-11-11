import { useObservableMutation } from '/src/api/ObservableMutation';
import {
  getPlaylistQueryKey,
  invalidateGetPlaylist,
} from '/src/api/endpoints/queries';
import { playlistFields } from '/src/api/endpoints/queries/useGetPlaylist';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { PlaylistFormT } from '/src/api/types/PlaylistT';
import { invalidateLoadUserId } from '/src/auth/endpoints';
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
    return wait(import.meta.env.DEV ? 1000 : 0, response.savePlaylist);
  });
};

export const useSavePlaylist = () => {
  return useObservableMutation({
    mutationFn: savePlaylist,
    onSuccess: (response: ObjT, args: ArgsT) => {
      // To avoid showing a loader, we populate the cache with the playlist that was just saved.
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

      return Promise.all([
        response.created ? invalidateLoadUserId({}) : Promise.resolve(),
        invalidateGetPlaylist({}),
      ]);
    },
  });
};
