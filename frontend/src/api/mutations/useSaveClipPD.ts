import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { getClipPDQueryKey } from '/src/api/queries';
import { queryClient } from '/src/api/queryClient';
import { ClipPDFormT } from '/src/api/types/ClipPDT';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  clipId: string;
  clipSlug: string;
  clipPDForm: ClipPDFormT;
};

export const saveClipPD = (args: ArgsT) => {
  return doQuery(
    `mutation saveClipPD(
      $clipId: UUID!
      $clipPDForm: ClipPDFormT!
    ) {
      saveClipPD(
        clipId: $clipId
        clipPDForm: $clipPDForm
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.saveClipPD);
  });
};

export const useSaveClipPD = () => {
  return useMutation({
    mutationKey: ['saveClipPD'],
    mutationFn: saveClipPD,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return queryClient.invalidateQueries({
        queryKey: getClipPDQueryKey({ clipSlug: args.clipSlug }),
      });
    },
  });
};
