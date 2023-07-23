import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { getPlaylistQueryKey } from '/src/api/queries';
import { queryClient } from '/src/api/queryClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  clipIds: string[];
};

export const deleteClips = (args: ArgsT) => {
  return doQuery(
    `mutation deleteClips(
      $clipIds: [UUID]!
    ) {
      deleteClips(
        clipIds: $clipIds
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.deleteClips);
  });
};

export const useDeleteClips = () => {
  return useMutation({
    mutationKey: ['deleteClips'],
    mutationFn: deleteClips,
    onSuccess: (response: ObjT) => {
      return queryClient.invalidateQueries({
        queryKey: getPlaylistQueryKey(),
      });
    },
  });
};
