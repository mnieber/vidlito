import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { useMutationData } from 'src/api/hooks';
import { ClipFormT } from 'src/api/types/ClipT';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  clipForm: ClipFormT;
};

export const saveClip = (args: ArgsT) => {
  return doQuery(
    `mutation saveClip(
      $clipForm: ClipFormT!
    ) {
      saveClip(
        clipForm: $clipForm
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.saveClip
    );
  });
};

export const useSaveClip = () => {
  const mutation = useMutation({
    mutationKey: ['saveClip'],
    mutationFn: saveClip,
    onSuccess: (response: ObjT, variables: ArgsT) => {
      // TODO: update any cliplist that has this clip
    },
  });
  return useMutationData(mutation);
};
