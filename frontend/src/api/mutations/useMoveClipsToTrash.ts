import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { getActionsQueryKey, getPlaylistQueryKey } from '/src/api/queries';
import { queryClient } from '/src/api/queryClient';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlist: PlaylistT;
  clipIds: string[];
};

export const moveClipsToTrash = (args: ArgsT) => {
  return doQuery(
    `mutation moveClipsToTrash(
      $playlistId: UUID!
      $clipIds: [UUID]!
    ) {
      moveClipsToTrash(
        clipIds: $clipIds
        playlistId: $playlistId
      ) {
        errors
        success
      }
    }`,
    {
      playlistId: args.playlist.id,
      clipIds: args.clipIds,
    }
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.moveClipsToTrash);
  });
};

export const useMoveClipsToTrash = () => {
  return useMutation({
    mutationKey: ['moveClipsToTrash'],
    mutationFn: moveClipsToTrash,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return invalidateActions(args.playlist);
    },
  });
};

export function invalidateActions(playlist: PlaylistT): unknown {
  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: getPlaylistQueryKey({ playlistId: playlist.id }),
    }),
    queryClient.invalidateQueries({
      queryKey: getActionsQueryKey({ playlistId: playlist.id }),
    }),
    queryClient.invalidateQueries({
      queryKey: getActionsQueryKey({ playlistId: undefined }),
    }),
  ]);
}
