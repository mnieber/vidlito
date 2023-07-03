import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { useActionsState } from '/src/actions/hooks/useActionsState';
import { isQueryLoading, isQueryUpdating } from '/src/api/QueryData';
import { useGetActions } from '/src/api/endpoints';
import { useQueryData } from '/src/api/hooks';
import { updateSources } from '/src/api/utils/updateSources';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { PaginationAdapter } from '/src/playlists/PlaylistsState/facets/PaginationAdapter';
import { graftResourceStates } from '/src/resourceStates/graftResourceStates';
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

    const pagination = useBuilder(() => {
      return new PaginationAdapter(actionsState.actionsCtr.pagination, 2);
    });

    const getActions = useQueryData(
      useGetActions({
        playlistId: actionsState.settings.showAllActions
          ? undefined
          : props.playlist?.id,
        page: actionsState.actionsCtr.pagination.page,
        pageSize: 10,
      }),
      {
        processQueryData: (data, prevData) => {
          graftResourceStates({
            resources: data?.actionSet ?? [],
            prevResources: prevData?.actionSet ?? [],
          });
          return data;
        },
      }
    );

    const cache = useBuilder(() =>
      makeAutoObservable({
        get actions() {
          return updateSources(
            { resource: getActions.data?.actionSet ?? [] },
            ['loading', () => isQueryLoading(getActions), 'getActions'],
            ['updating', () => isQueryUpdating(getActions), 'getActions']
          );
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
        action: () => cache.action,
        actionsHighlight: () => actionsState.actionsCtr.highlight,
        actionsPagination: () => pagination,
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
