import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useActionsState } from 'src/actions/hooks/useActionsState';
import { useGetActions } from 'src/api/endpoints';
import { useQueryData } from 'src/api/hooks';
import { cloneAndSetState } from 'src/api/utils/cloneAndSetState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
};

export const ActionsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { actionsState } = useActionsState({});

    const getActions = useQueryData(
      useGetActions({
        playlistId: props.playlist?.id,
      })
    );

    useUpdateStateReaction({
      getInputs: () => ({
        actions: getActions.data?.actionSet,
      }),
      updateState: (inputs) => {
        actionsState.actions.data.actions = inputs.actions ?? [];
      },
      logState: () => {
        log('ActionsState updated', actionsState.getSummary());
      },
    });

    const [cache] = React.useState(() =>
      makeAutoObservable({
        get actions() {
          const actionsDisplay = actionsState.actions.data.actions;
          return cloneAndSetState(actionsDisplay, [
            [
              ['loading', 'getActions'],
              [getActions, !getActions.data?.actionSet],
            ],
            [
              ['updating', 'getActions'],
              [getActions, !!getActions.data?.actionSet],
            ],
          ]);
        },
        get action() {
          return actionsState.actions.highlight.item;
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
        actionsHighlight: () => actionsState.actions.highlight,
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
