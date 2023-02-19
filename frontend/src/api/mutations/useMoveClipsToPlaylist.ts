import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { queryClient } from 'src/api/queryClient';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  srcPlaylistId: string;
  srcPlaylistSlug: string;
  destPlaylistId: string;
  clipIds: string[];
  copy: boolean;
};

export const moveClipsToPlaylist = (args: ArgsT) => {
  return doQuery(
    `mutation moveClipsToPlaylist(
      $srcPlaylistId: ID!
      $destPlaylistId: ID!
      $clipIds: [String]!
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
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.moveClipsToPlaylist
    );
  });
};

export const useMoveClipsToPlaylist = () => {
  return useMutation({
    mutationKey: ['moveClipsToPlaylist'],
    mutationFn: moveClipsToPlaylist,
    onSuccess: (response: ObjT, args: ArgsT) => {
      queryClient.invalidateQueries({
        queryKey: ['getPlaylist', args.srcPlaylistSlug],
      });
    },
  });
};
