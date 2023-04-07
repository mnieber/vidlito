import { action } from 'mobx';
import React from 'react';
import { ActionsState } from 'src/actions/ActionsState';
import { isRunning } from 'src/api/MutationData';
import { addUpdater } from 'src/api/ResourceState';
import { useMutationData } from 'src/api/hooks';
import { useUndoAction } from 'src/api/mutations/useUndoAction';
import { ActionT } from 'src/api/types/ActionT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { usePropsRef } from 'src/utils/hooks/usePropsRef';

export type PropsT = { playlists: PlaylistT[] };

export const useActionsState = (props: PropsT) => {
  const undoAction = useMutationData(useUndoAction());
  const propsRef = usePropsRef<PropsT>(props);

  const actionsState = useBuilder<ActionsState>(() => {
    return new ActionsState({
      undoAction: action((actionId: string) => {
        const action: ActionT | undefined =
          actionsState.actionsCtr.data.actionById[actionId];
        if (!action) {
          return Promise.reject('Action not found');
        }

        const playlist: PlaylistT | undefined =
          propsRef.current?.playlists.find((x) => x.id === action.playlistId);
        if (!playlist) {
          return Promise.reject('Playlist not found');
        }

        const removeUpdater = addUpdater(
          [action],
          () => isRunning(undoAction),
          'undoAction'
        );
        return undoAction
          .mutateAsync({
            actionId,
            playlist: playlist,
          })
          .then(() => {
            removeUpdater();
          });
      }),
    });
  }) as ActionsState;

  React.useEffect(() => () => actionsState.destroy(), [actionsState]);

  return {
    actionsState,
    undoAction,
  };
};
