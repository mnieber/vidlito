import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { loadUserIdQueryKey } from '/src/auth/endpoints';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistIds: string[];
};

export const deletePlaylists = (args: ArgsT) => {
  return doQuery(
    `mutation deletePlaylists(
      $playlistIds: [UUID]!
    ) {
      deletePlaylists(
        playlistIds: $playlistIds
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.deletePlaylists);
  });
};

export const useDeletePlaylists = () => {
  return useObservableMutation({
    mutationFn: deletePlaylists,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: loadUserIdQueryKey({}),
        }),
      ]);
    },
  });
};
