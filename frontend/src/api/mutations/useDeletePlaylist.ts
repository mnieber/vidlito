import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { useMutationData } from 'src/api/hooks';
import { queryClient } from 'src/api/queryClient';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistId: string;
};

export const deletePlaylist = (args: ArgsT) => {
  return doQuery(
    `mutation deletePlaylist(
      $playlistId: ID!
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
  const mutation = useMutation(['deletePlaylist'], deletePlaylist, {
    onSuccess: (response: ObjT) => {
      queryClient.invalidateQueries(['getUserProfile']);
    },
  });
  return useMutationData(mutation);
};
