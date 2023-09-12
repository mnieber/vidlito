import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { updateSources } from 'mobx-resource-states';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { useActionsState } from '/src/actions/hooks/useActionsState';
import { isQueryLoading } from '/src/api/ObservableQuery';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
};

export const ActionsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          actionsState: () => state,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        actions: () => cache.actions,
        action: () => cache.action,
        actionsHighlight: () => state.actionsCtr.highlight,
        actionsPagination: () => state.actionsCtr.pagination,
        actionsUndo: () => state.actionsCtr.undo,
      };

      return result;
    };

    return (
      <DefaultPropsProvider extend value={getDefaultPropsContext()}>
        {props.children}
      </DefaultPropsProvider>
    );
  }, DefaultProps)
);
