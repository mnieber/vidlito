import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { getActionsQueryKey, getPlaylistQueryKey } from '/src/api/queries';
import { queryClient } from '/src/api/queryClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistId: string;
  playlistSlug: string;
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
      playlistId: args.playlistId,
      clipIds: args.clipIds,
    }
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.moveClipsToTrash);
  });
};

export const useMoveClipsToTrash = () => {
  return useObservableMutation({
    mutationFn: moveClipsToTrash,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return invalidateActions(args.playlistId, args.playlistSlug);
    },
  });
};

export function invalidateActions(
  playlistId: string,
  playlistSlug: string
): Promise<any> {
  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: getPlaylistQueryKey({ playlistSlug: playlistSlug }),
    }),
    queryClient.invalidateQueries({
      queryKey: getActionsQueryKey({ playlistId: playlistId }),
    }),
    queryClient.invalidateQueries({
      queryKey: getActionsQueryKey({ playlistId: undefined }),
    }),
  ]);
}
