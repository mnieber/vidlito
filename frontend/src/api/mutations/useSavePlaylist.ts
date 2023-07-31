import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { getPlaylistQueryKey } from '/src/api/queries';
import { getPlaylist } from '/src/api/queries/useGetPlaylist';
import { queryClient } from '/src/api/queryClient';
import { PlaylistFormT } from '/src/api/types/PlaylistT';
import { loadUserIdQueryKey } from '/src/auth/endpoints';
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
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(!!import.meta.env.DEV ? 1000 : 0, response.savePlaylist);
  });
};

export const useSavePlaylist = () => {
  return useMutation({
    mutationKey: ['savePlaylist'],
    mutationFn: savePlaylist,
    onSuccess: (response: ObjT, args: ArgsT) => {
      const getPlaylistArgs = { playlistSlug: args.playlistForm.slug };
      const invalidateLoadUserId = response.created
        ? [queryClient.invalidateQueries({ queryKey: loadUserIdQueryKey({}) })]
        : [];
      return Promise.all([
        ...invalidateLoadUserId,
        queryClient.invalidateQueries({
          queryKey: getPlaylistQueryKey(),
        }),
        getPlaylist(getPlaylistArgs).then((getPlaylistResponse: ObjT) => {
          // To avoid showing a loader, we populate the cache with the
          // playlist that was just saved.
          queryClient.setQueryData(
            getPlaylistQueryKey(getPlaylistArgs),
            getPlaylistResponse
          );
        }),
      ]);
    },
  });
};
