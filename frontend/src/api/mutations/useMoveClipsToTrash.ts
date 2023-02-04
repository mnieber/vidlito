import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
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
  return useMutation({
    mutationKey: ['moveClipsToTrash'],
    mutationFn: moveClipsToTrash,
    onSuccess: (response: ObjT, args: ArgsT) => {
      // TODO: check that variables indeed contains the playlistId
      debugger;
      queryClient.invalidateQueries({
        queryKey: ['getPlaylist', { playlistId: args.playlistId }],
      });
    },
  });
};
