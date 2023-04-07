import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { getActionsQueryKey, getPlaylistQueryKey } from 'src/api/queries';
import { updateQueries } from 'src/api/queryClient';
import { ActionT } from 'src/api/types/ActionT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { applyUpdate } from 'src/utils/applyUpdate';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  actionId: string;
  playlist: PlaylistT;
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
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.undoAction
    );
  });
};

export const useUndoAction = () => {
  return useMutation({
    mutationKey: ['undoAction'],
    mutationFn: undoAction,
    onSuccess: (response: ObjT, args: ArgsT) => {
      const updateActions = (actions: ActionT[]) => {
        // Remove action from actions
        const index = actions.findIndex(
          (action) => action.id === args.actionId
        );
        if (index !== -1) {
          actions.splice(index, 1);
        }
        return actions;
      };

      updateQueries({
        queryKey: getActionsQueryKey({ playlistId: args.playlist.id }),
        invalidate: true,
        update: (data: any) => applyUpdate(['actionSet'], data, updateActions),
      });

      updateQueries({
        queryKey: getPlaylistQueryKey({ playlistSlug: args.playlist.slug }),
        invalidate: true,
      });
    },
  });
};
