import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { updateQueries } from 'src/api/queryClient';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistId: string;
};

export const deletePlaylist = (args: ArgsT) => {
  return doQuery(
    `mutation deletePlaylist(
      $playlistId: UUID!
    ) {
      deletePlaylist(
        playlistId: $playlistId
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.deletePlaylist
    );
  });
};

export const useDeletePlaylist = () => {
  return useMutation({
    mutationKey: ['deletePlaylist'],
    mutationFn: deletePlaylist,
    onSuccess: (response: ObjT) => {
      updateQueries({
        queryKey: ['getUserProfile'],
        invalidate: true,
      });
    },
  });
};
