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
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { useGraftResourceStatesFromMemo } from '/src/utils/hooks/useGraftResourceStatesFromMemo';
import { createUUID } from '/src/utils/ids';

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
  const showAllActions = actionsStateRef.current?.settings.showAllActions;
  const actionsCtr = actionsStateRef.current?.actionsCtr;
  const stubPlaylistId = createUUID();
  const getPlaylistActions = useObservableQuery(
    useGetActions(
      {
        playlistId: props.getPlaylist()?.id ?? stubPlaylistId,
        page: actionsCtr?.pagination.requestedPage ?? 1,
        pageSize: actionsCtr?.pagination.pageSize ?? 10,
      },
      {
        enabled:
          !!actionsStateRef.current && !!props.getPlaylist() && !showAllActions,
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
        page: actionsCtr?.pagination.page ?? 1,
        pageSize: actionsCtr?.pagination.pageSize ?? 10,
      },
      {
        enabled: !!actionsStateRef.current && showAllActions,
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
        getPagination: () => {
          const getActions = actionsState.settings.showAllActions
            ? getAllActions
            : getPlaylistActions;
          return getActions.data?.pagination;
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
