import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { getPlaylistQueryKey } from '/src/api/queries';
import { queryClient } from '/src/api/queryClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  srcPlaylistId: string;
  destPlaylistId: string;
  clipIds: string[];
  copy: boolean;
};

export const moveClipsToPlaylist = (args: ArgsT) => {
  return doQuery(
    `mutation moveClipsToPlaylist(
      $srcPlaylistId: UUID!
      $destPlaylistId: UUID!
      $clipIds: [UUID]!
      $copy: Boolean!
    ) {
      moveClipsToPlaylist(
        clipIds: $clipIds
        copy: $copy
        destPlaylistId: $destPlaylistId
        srcPlaylistId: $srcPlaylistId
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.moveClipsToPlaylist);
  });
};

export const useMoveClipsToPlaylist = () => {
  return useMutation({
    mutationKey: ['moveClipsToPlaylist'],
    mutationFn: moveClipsToPlaylist,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: getPlaylistQueryKey(),
        }),
      ]);
    },
  });
};
