import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import {
  createGetActionsQueryKey,
  createGetPlaylistQueryKey,
} from 'src/api/queries';
import { queryClient } from 'src/api/queryClient';
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
      const getActionsQueryKey = createGetActionsQueryKey({
        playlistId: args.playlist.id,
      });

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

      queryClient.setQueriesData(
        { queryKey: getActionsQueryKey },
        (data: any) => applyUpdate(['actionSet'], data, updateActions)
      );

      queryClient.invalidateQueries({
        queryKey: createGetPlaylistQueryKey({
          playlistSlug: args.playlist.slug,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: getActionsQueryKey,
      });
    },
  });
};
