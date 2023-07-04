import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { invalidateActions } from '/src/api/mutations/useMoveClipsToTrash';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  actionId: string;
  playlistId: string;
  playlistSlug: string;
};

export const undoAction = (args: ArgsT) => {
  return doQuery(
    `mutation undoAction(
      $actionId: UUID!
    ) {
      undoAction(
        actionId: $actionId
      ) {
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.undoAction);
  });
};

export const useUndoAction = () => {
  return useMutation({
    mutationKey: ['undoAction'],
    mutationFn: undoAction,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return invalidateActions(args.playlistId, args.playlistSlug);
    },
  });
};
