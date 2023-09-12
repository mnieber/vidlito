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
import { createUUID } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  getPlaylist: () => PlaylistT | undefined;
  getPlaylists: () => PlaylistT[];
  getUsername: () => string;
};

export const useActionsState = (props: PropsT) => {
  const actionsStateRef = React.useRef<ActionsState | undefined>();
  const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo({});

  // Mutations
  const undoAction = useUndoAction();

  const onSuccess = (data: ObjT) => {
    const actionsCtr = actionsStateRef.current?.actionsCtr;
    if (actionsCtr) {
      resetPagination(actionsCtr.pagination, data.pagination);
    }
  };

  // Queries
  const showAllActions = actionsStateRef.current?.settings.showAllActions;
  const stubPlaylistId = createUUID();
  const getPlaylistActions = useObservableQuery(
    useGetActions(
      {
        playlistId: props.getPlaylist()?.id ?? stubPlaylistId,
        page: actionsStateRef.current?.actionsCtr.pagination.page ?? 1,
        pageSize: 10,
        username: props.getUsername(),
      },
      {
        enabled:
          !!actionsStateRef.current && !!props.getPlaylist() && !showAllActions,
        onSuccess: onSuccess,
      }
    ),
    {
      fetchAsLoad: true,
      debugLabel: 'getPlaylistActions',
    }
  );
  const getAllActions = useObservableQuery(
    useGetActions(
      {
        playlistId: undefined,
        page: actionsStateRef.current?.actionsCtr.pagination.page ?? 1,
        pageSize: 10,
        username: props.getUsername(),
      },
      {
        enabled: !!actionsStateRef.current && showAllActions,
        onSuccess: onSuccess,
      }
    ),
    { fetchAsLoad: true, debugLabel: 'getAllActions' }
  );

  const actionsState = (actionsStateRef.current = useBuilder<ActionsState>(
    () => {
      return new ActionsState({
        //
        getActions: () => {
          const getActions = actionsState.settings.showAllActions
            ? getAllActions
            : getPlaylistActions;
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
  )) as ActionsState;

  React.useEffect(() => () => actionsState.destroy(), [actionsState]);

  return {
    actionsState,
    undoAction,
    getAllActions,
    getPlaylistActions,
  };
};
