import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { invalidateGetClipPd } from '/src/api/queries';
import { ClipPdFormT } from '/src/api/types/ClipPdT';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  clipId: string;
  clipSlug: string;
  clipPdForm: ClipPdFormT;
};

export const saveClipPd = (args: ArgsT) => {
  return doQuery(
    `mutation saveClipPd(
      $clipId: UUID!
      $clipPdForm: ClipPdFormT!
    ) {
      saveClipPd(
        clipId: $clipId
        clipPdForm: $clipPdForm
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.saveClipPd);
  });
};

export const useSaveClipPd = () => {
  return useObservableMutation({
    mutationFn: saveClipPd,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return invalidateGetClipPd({ clipSlug: args.clipSlug });
    },
  });
};
