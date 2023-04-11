import { action } from 'mobx';
import React from 'react';
import { ActionsState } from 'src/actions/ActionsState';
import { useUndoAction } from 'src/api/mutations/useUndoAction';
import { ActionT } from 'src/api/types/ActionT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { initRS } from 'src/resourceStates/ResourceState';
import { trackPromise } from 'src/resourceStates/trackPromise';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { usePropsRef } from 'src/utils/hooks/usePropsRef';

export type PropsT = { playlists: PlaylistT[] };

export const useActionsState = (props: PropsT) => {
  const undoAction = initRS(useUndoAction());
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

        return trackPromise({
          name: 'undoAction',
          promise: undoAction.mutateAsync({
            actionId,
            playlist: playlist,
          }),
          states: {
            updating: [action, undoAction],
          },
        }).result;
      }),
    });
  }) as ActionsState;

  React.useEffect(() => () => actionsState.destroy(), [actionsState]);

  return {
    actionsState,
    undoAction,
  };
};
