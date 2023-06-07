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

    const getActions = useQueryData(
      useGetActions({
        playlistId: actionsState.settings.showAllActions
          ? undefined
          : props.playlist?.id,
        username: props.userProfile?.username,
      })
    );

    useUpdateStateReaction({
      getInputs: () => ({
        actions: getActions.data?.actionSet,
      }),
      updateState: (inputs) => {
        actionsState.actionsCtr.data.actions = graftResourceStates({
          resources: inputs.actions ?? [],
          prevResources: actionsState.actionsCtr.data.actions,
        });
      },
      logState: () => {
        log('ActionsState updated', actionsState.getSummary());
      },
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get actions() {
          return updateSources(
            { resource: actionsState.actionsCtr.data.actions },
            ['loading', () => isQueryLoading(getActions), 'getActions'],
            ['updating', () => isQueryUpdating(getActions), 'getActions']
          );
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
        action: () => cache.action,
        actionsHighlight: () => actionsState.actionsCtr.highlight,
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
