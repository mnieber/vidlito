import { action } from 'mobx';
import { trackPromise } from 'mobx-resource-states';
import React from 'react';
import { ActionsState } from '/src/actions/ActionsState';
import { useGetActions } from '/src/api/endpoints';
import { UndoActionArgsT } from '/src/api/endpoints/mutations';
import { useUndoAction } from '/src/api/endpoints/mutations/useUndoAction';
import { useObservableQuery } from '/src/api/hooks';
import { ActionT } from '/src/api/types/ActionT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { resetPagination } from '/src/playlists/PlaylistsState/facets/Pagination';
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
      {
        enabled: !!actionsStateRef.current,
        onSuccess: (data) => {
          const actionsCtr = actionsStateRef.current?.actionsCtr;
          if (actionsCtr) {
            resetPagination(actionsCtr.pagination, data.pagination);
          }
        },
      }
    ),
    { fetchAsLoad: true, debugLabel: 'getActions' }
  );

  const actionsState = (actionsStateRef.current = useBuilder<ActionsState>(
    () => {
      return new ActionsState({
        //
        getActions: () => {
          return graftResourceStatesFromMemo({
            resources: getActions.data?.actionSet ?? [],
          });
        },
        //
        undoAction: action((action: ActionT) => {
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
              actionId: action.id,
              playlistId: playlist.id,
              playlistSlug: playlist.slug,
            } as UndoActionArgsT),
          }).result;
        }),
      });
    }
  ) as ActionsState);

  React.useEffect(() => () => actionsState.destroy(), [actionsState]);

  return {
    actionsState,
    undoAction,
    getActions,
  };
};
