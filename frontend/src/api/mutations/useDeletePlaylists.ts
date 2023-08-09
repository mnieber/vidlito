import * as R from 'ramda';
import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

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
    return wait(import.meta.env.DEV ? 1000 : 0, response.deletePlaylist);
  });
};

export const useDeletePlaylists = () => {
  return useObservableMutation({
    mutationFn: (playlistIds: string[]) =>
      Promise.all(
        R.map(
          (playlistId: string) =>
            deletePlaylist({
              playlistId,
            } as ArgsT),
          playlistIds
        )
      ),
    onSuccess: (response: ObjT) => {
      return queryClient.invalidateQueries({
        queryKey: ['getUserProfile'],
      });
    },
  });
};
