import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { useActionsState } from '/src/actions/hooks/useActionsState';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { updateSources } from '/src/api/utils/updateSources';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  PaginationAdapter,
  getDisplayPage,
} from '/src/playlists/PlaylistsState/facets/PaginationAdapter';
import { shareRS } from '/src/resourceStates/ResourceState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
  ...dps.userProfile,
};

export const ActionsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { actionsState, getActions } = useActionsState({
      getPlaylist: () => props.playlist,
      getPlaylists: () => props.playlists,
    });

    // The display pagination adapts the default pagination
    const displayPagination = useBuilder(() => {
      return new PaginationAdapter(actionsState.actionsCtr.pagination, 5);
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get actions() {
          const actions = actionsState.actionsCtr.store.items;
          return updateSources(
            { resource: actions },
            ['loading', () => isQueryLoading(getActions), 'getActions'],
            ['updating', () => isQueryUpdating(getActions), 'getActions']
          );
        },
        get actionsPage() {
          const items = getDisplayPage(
            actionsState.actionsCtr.pagination,
            displayPagination,
            cache.actions
          );
          shareRS(cache.actions, items);
          return items;
        },
        get action() {
          return actionsState.actionsCtr.highlight.item;
        },
      })
    );

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          actionsState: () => actionsState,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        actions: () => cache.actions,
        actionsPage: () => cache.actionsPage,
        action: () => cache.action,
        actionsHighlight: () => actionsState.actionsCtr.highlight,
        actionsPagination: () => displayPagination,
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
