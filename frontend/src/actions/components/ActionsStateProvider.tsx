import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { updateSources } from 'mobx-resource-states';
import * as R from 'ramda';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { ActionsContext } from '/src/actions/hooks/useActionsContext';
import { useActionsState } from '/src/actions/hooks/useActionsState';
import { isQueryLoading } from '/src/api/ObservableQuery';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { createGetProps } from '/src/utils/createGetProps';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const ContextProps = {
  playlist: playlistsCtx.playlist,
  playlists: playlistsCtx.playlists,
};

export const ActionsStateProvider = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const {
      actionsState: state,
      getAllActions,
      getPlaylistActions,
    } = useActionsState({
      getPlaylist: () => props.playlist,
      getPlaylists: () => props.playlists,
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get actions() {
          return updateSources(
            { resource: state.actionsCtr.store.items, resourceName: 'actions' },
            [
              'loading',
              () => {
                const getActions = state.settings.showAllActions
                  ? getAllActions
                  : getPlaylistActions;
                return isQueryLoading(getActions);
              },
              'getActions',
            ]
          );
        },
        get action() {
          return state.actionsCtr.highlight.item;
        },
      })
    );

    const getActionsContext = () => {
      return createGetProps(
        R.mergeAll([
          {
            actionsState: () => state,
          },
          {
            actions: () => cache.actions,
            action: () => cache.action,
            actionsHighlight: () => state.actionsCtr.highlight,
            actionsPagination: () => state.actionsCtr.pagination,
            actionsUndo: () => state.actionsCtr.undo,
          },
        ])
      );
    };

    return (
      <ActionsContext.Provider value={getActionsContext()}>
        {props.children}
      </ActionsContext.Provider>
    );
  }, ContextProps)
);
