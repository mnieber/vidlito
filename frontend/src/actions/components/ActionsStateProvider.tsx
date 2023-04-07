import { autorun, makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useActionsState } from 'src/actions/hooks/useActionsState';
import { isQueryLoading, isQueryUpdating } from 'src/api/QueryData';
import { useGetActions } from 'src/api/endpoints';
import { useQueryData } from 'src/api/hooks';
import { invalidateGetActions } from 'src/api/queries/useGetActions';
import { withSources } from 'src/api/utils/withSources';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { AuthStateContext } from 'src/auth/components/AuthStateProvider';
import { States } from 'src/auth/endpoints/states';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { graftResourceStates } from 'src/resourceStates/graftResourceStates';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { log } from 'src/utils/logging';
import useDeepCompareEffect from 'use-deep-compare-effect';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
};

export const ActionsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const authState = React.useContext(AuthStateContext);

    const { actionsState } = useActionsState({
      playlists: props.playlists,
    });

    const queryArgs = {
      playlistId: actionsState.settings.showAllActions
        ? undefined
        : props.playlist?.id,
    };
    const getActions = useQueryData(useGetActions(queryArgs));

    useDeepCompareEffect(() => {
      return autorun(() => {
        if (
          authState?.state === States.SIGN_OUT_SUCCEEDED ||
          authState?.state === States.SIGN_IN_SUCCEEDED
        ) {
          invalidateGetActions(queryArgs);
        }
      });
    }, [queryArgs, authState]);

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
          return withSources({
            resource: actionsState.actionsCtr.data.actions,
            loading: [[() => isQueryLoading(getActions), 'getActions']],
            updating: [[() => isQueryUpdating(getActions), 'getActions']],
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
