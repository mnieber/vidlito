import { action } from 'mobx';
import React from 'react';
import { ActionsState } from '/src/actions/ActionsState';
import { useGetActions } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { UndoActionArgsT } from '/src/api/mutations';
import { useUndoAction } from '/src/api/mutations/useUndoAction';
import { ActionT } from '/src/api/types/ActionT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { trackPromise } from '/src/resourceStates/trackPromise';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { useGraftResourceStatesFromMemo } from '/src/utils/hooks/useGraftResourceStatesFromMemo';

export type PropsT = {
  getPlaylist: () => PlaylistT | undefined;
  getPlaylists: () => PlaylistT[];
};

export const useActionsState = (props: PropsT) => {
  const actionsStateRef = React.useRef<ActionsState | undefined>();
  const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo({});

  // Mutations
  const undoAction = useUndoAction();

  // Queries
  const getActions = useObservableQuery(
    useGetActions(
      {
        playlistId: actionsStateRef.current?.settings.showAllActions
          ? undefined
          : props.getPlaylist()?.id,
        page: actionsStateRef.current?.actionsCtr.pagination.page ?? 1,
        pageSize: 10,
      },
      { enabled: !!actionsStateRef.current }
    )
  );

  const actionsState = useBuilder<ActionsState>(() => {
    return new ActionsState({
      //
      getActions: () => {
        return graftResourceStatesFromMemo({
          resources: getActions.data?.actionSet ?? [],
        });
      },
      //
      getActionsPagination: () => {
        return getActions.data?.pagination;
      },
      //
      undoAction: action((actionId: string) => {
        const action: ActionT | undefined =
          actionsState!.actionsCtr.store.itemById[actionId];
        if (!action) {
          return Promise.reject('Action not found');
        }

        const playlist: PlaylistT | undefined = props
          .getPlaylists()
          .find((x) => x.id === action.playlistId);
        if (!playlist) {
          return Promise.reject('Playlist not found');
        }

        return trackPromise({
          name: 'undoAction',
          states: { updating: [action] },
          promise: undoAction.mutateAsync({
            actionId,
            playlistId: playlist.id,
            playlistSlug: playlist.slug,
          } as UndoActionArgsT),
        }).result;
      }),
    });
  }) as ActionsState;
  actionsStateRef.current = actionsState;

  React.useEffect(() => () => actionsState.destroy(), [actionsState]);

  return {
    actionsState,
    undoAction,
    getActions,
  };
};
