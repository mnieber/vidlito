import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useActionsState } from 'src/actions/hooks/useActionsState';
import { useGetActions } from 'src/api/endpoints';
import { useQueryData } from 'src/api/hooks';
import { initRS } from 'src/api/ResourceState';
import { cloneAndSetState } from 'src/api/utils/cloneAndSetState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
};

export const ActionsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { actionsState, undoAction } = useActionsState({
      playlists: props.playlists,
    });

    const getActions = useQueryData(
      useGetActions({
        playlistId: actionsState.settings.showAllActions
          ? undefined
          : props.playlist?.id,
      })
    );

    useUpdateStateReaction({
      getInputs: () => ({
        actions: getActions.data?.actionSet,
      }),
      updateState: (inputs) => {
        actionsState.actionsCtr.data.actions = inputs.actions ?? [];
        R.forEach(initRS, actionsState.actionsCtr.data.actions);
      },
      logState: () => {
        log('ActionsState updated', actionsState.getSummary());
      },
    });

    const [cache] = React.useState(() =>
      makeAutoObservable({
        get actions() {
          // TODO: this work should be done in updateState, where these sources
          // are added to actionsState.actionsCtr.data.actions when we set the
          // new value of actionsState.actionsCtr.data.actions.
          const actionsDisplay = actionsState.actionsCtr.data.actions;
          return cloneAndSetState({
            resource: actionsDisplay,
            sources: [
              [
                ['loading', 'getActions'],
                !getActions.data?.actionSet ? getActions : undefined,
              ],
              [
                ['updating', 'getActions'],
                !!getActions.data?.actionSet ? getActions : undefined,
              ],
              [
                ['updating', 'undoAction'],
                !!actionsDisplay ? undoAction : undefined,
              ],
            ],
          });
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
      <NestedDefaultPropsContext value={getDefaultPropsContext()}>
        {props.children}
      </NestedDefaultPropsContext>
    );
  }, DefaultProps)
);
