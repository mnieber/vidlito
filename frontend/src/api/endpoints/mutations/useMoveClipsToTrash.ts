import { useObservableMutation } from '/src/api/ObservableMutation';
import { invalidateGetPlaylist } from '/src/api/endpoints/queries';
import { invalidateGetActions } from '/src/api/endpoints/queries/useGetActions';
import { doQuery } from '/src/api/graphqlClient';
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
      return Promise.all([
        invalidateActions(args.playlistId),
        invalidateGetPlaylist({ playlistSlug: args.playlistSlug }),
      ]);
    },
  });
};

export function invalidateActions(playlistId: string): Promise<any> {
  return Promise.all([
    invalidateGetActions({ playlistId: playlistId }),
    invalidateGetActions({ playlistId: undefined }),
  ]);
}
