import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { getPlaylistPDQueryKey } from '/src/api/queries';
import { queryClient } from '/src/api/queryClient';
import { PlaylistPDFormT } from '/src/api/types/PlaylistT';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistId: string;
  playlistSlug: string;
  playlistPDForm: PlaylistPDFormT;
};

export const savePlaylistPD = (args: ArgsT) => {
  return doQuery(
    `mutation savePlaylistPD(
      $playlistId: UUID!
      $playlistPDForm: PlaylistPDFormT!
    ) {
      savePlaylistPD(
        playlistId: $playlistId
        playlistPDForm: $playlistPDForm
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.savePlaylistPD);
  });
};

export const useSavePlaylistPD = () => {
  return useMutation({
    mutationKey: ['savePlaylistPD'],
    mutationFn: savePlaylistPD,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return queryClient.invalidateQueries({
        queryKey: getPlaylistPDQueryKey({ playlistSlug: args.playlistSlug }),
      });
    },
  });
};
