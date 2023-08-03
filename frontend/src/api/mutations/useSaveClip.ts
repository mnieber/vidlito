import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { getPlaylistQueryKey } from '/src/api/queries';
import { queryClient } from '/src/api/queryClient';
import { ClipFormT } from '/src/api/types/ClipT';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistId: string;
  clipForm: ClipFormT;
  parentClipId?: string;
};

export const saveClip = (args: ArgsT) => {
  return doQuery(
    `mutation saveClip(
      $playlistId: UUID!
      $clipForm: ClipFormT!
      $parentClipId: UUID
    ) {
      saveClip(
        clipForm: $clipForm
        playlistId: $playlistId
        parentClipId: $parentClipId
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.saveClip);
  });
};

export const useSaveClip = () => {
  return useMutation({
    mutationKey: ['saveClip'],
    mutationFn: saveClip,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return queryClient.invalidateQueries({
        queryKey: getPlaylistQueryKey(),
      });
    },
  });
};
