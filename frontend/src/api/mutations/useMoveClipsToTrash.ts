import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { useMutationData } from 'src/api/hooks';
import { queryClient } from 'src/api/queryClient';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistId: string;
  clipIds: string[];
};

export const moveClipsToTrash = (args: ArgsT) => {
  return doQuery(
    `mutation moveClipsToTrash(
      $playlistId: ID!
      $clipIds: [String]!
    ) {
      moveClipsToTrash(
        clipIds: $clipIds
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
      response.moveClipsToTrash
    );
  });
};

export const useMoveClipsToTrash = () => {
  const mutation = useMutation(['moveClipsToTrash'], moveClipsToTrash, {
    onSuccess: (response: ObjT, variables: ArgsT) => {
      // TODO: check that variables indeed contains the playlistId
      debugger;
      queryClient.invalidateQueries([
        'getPlaylist',
        { playlistId: variables.playlistId },
      ]);
    },
  });
  return useMutationData(mutation);
};
