import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { useGetActionsObservableQuery } from '/src/actions/ActionsState/queries/useGetActionsObservableQuery';
import { useActionsState } from '/src/actions/hooks/useActionsState';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { updateSources } from '/src/api/utils/updateSources';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import {
  PaginationAdapter,
  getDisplayPage,
} from '/src/playlists/PlaylistsState/facets/PaginationAdapter';
import { shareRS } from '/src/resourceStates/ResourceState';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { log } from '/src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
  ...dps.userProfile,
};

export const ActionsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { actionsState } = useActionsState({
      playlists: props.playlists,
    });

    const getActions = useGetActionsObservableQuery({
      playlistId: actionsState.settings.showAllActions
        ? undefined
        : props.playlist?.id,
      page: actionsState.actionsCtr.pagination.page,
    });

    const displayPagination = useBuilder(() => {
      return new PaginationAdapter(actionsState.actionsCtr.pagination, 2);
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get actions() {
          return updateSources(
            { resource: getActions.data?.actionSet ?? [] },
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

    useUpdateStateReaction({
      getInputs: () => ({
        actions: cache.actions,
        paginationResponse: getActions.data?.pagination,
      }),
      updateState: (inputs) => {
        actionsState.actionsCtr.store.items = inputs.actions ?? [];
        actionsState.actionsCtr.pagination.nrOfItems =
          inputs.paginationResponse?.nrOfItems ?? 0;
        actionsState.actionsCtr.pagination.pageSize =
          inputs.paginationResponse?.pageSize ?? 0;
      },
      logState: () => {
        log('ActionsState updated', actionsState.getSummary());
      },
    });

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
