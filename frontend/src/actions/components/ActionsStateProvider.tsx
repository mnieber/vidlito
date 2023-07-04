import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { useActionsState } from '/src/actions/hooks/useActionsState';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { useGetActions } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { updateSources } from '/src/api/utils/updateSources';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import {
  PaginationAdapter,
  getDisplayPage,
} from '/src/playlists/PlaylistsState/facets/PaginationAdapter';
import { shareRS } from '/src/resourceStates/ResourceState';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { useGraftResourceStatesFromMemo } from '/src/utils/hooks/useGraftResourceStatesFromMemo';
import { log } from '/src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
  ...dps.userProfile,
};

export const ActionsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    // Create actions state
    const { actionsState } = useActionsState({
      playlists: props.playlists,
    });

    // The display pagination adapts the actions pagination
    const displayPagination = useBuilder(() => {
      return new PaginationAdapter(actionsState.actionsCtr.pagination, 2);
    });

    // Get query data
    const getActions = useObservableQuery(
      useGetActions({
        playlistId: actionsState.settings.showAllActions
          ? undefined
          : props.playlist?.id,
        page: actionsState.actionsCtr.pagination.page,
        pageSize: 10,
      })
    );
    const getActionsData = () => getActions.data?.actionSet ?? [];
    const getPaginationData = () => getActions.data?.pagination;

    // Update the actions state based on the inputs
    const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo();
    useUpdateStateReaction({
      getInputs: () => ({
        actions: getActionsData(),
        pagination: getPaginationData(),
      }),
      updateState: (inputs) => {
        actionsState.actionsCtr.store.items = graftResourceStatesFromMemo({
          resources: inputs.actions,
        });
        actionsState.actionsCtr.pagination.nrOfItems =
          inputs.pagination?.nrOfItems ?? 0;
        actionsState.actionsCtr.pagination.pageSize =
          inputs.pagination?.pageSize ?? 0;
      },
      logState: () => {
        log('ActionsState updated', actionsState.getSummary());
      },
    });

    // Create a cache for data that has resource states
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
