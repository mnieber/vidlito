import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { isQueryLoading, isQueryUpdating } from '/src/api/QueryData';
import { useQueryData } from '/src/api/hooks';
import { updateSources } from '/src/api/utils';
import { withDefaultProps } from '/src/app/defaultProps';
import { useLoadUserId } from '/src/auth/endpoints';
import { useDashboardState } from '/src/dashboard/hooks/useDashboardState';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { log } from '/src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const DashboardStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { dashboardState } = useDashboardState({});

    const loadUserId = useQueryData(useLoadUserId());

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: loadUserId.data?.userProfile,
        isAuthenticated: loadUserId.data?.isAuthenticated,
      }),
      updateState: (inputs) => {
        dashboardState.account.username = inputs.userProfile?.username;
        dashboardState.account.userProfile = inputs.userProfile;
        dashboardState.account.isAuthenticated = inputs.isAuthenticated;
      },
      logState: () =>
        log('DashboardState updated', dashboardState.getSummary()),
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get userProfile() {
          return updateSources(
            { resource: loadUserId.data?.userProfile },
            ['loading', () => isQueryLoading(loadUserId), 'loadUserId'],
            ['updating', () => isQueryUpdating(loadUserId), 'loadUserId']
          );
        },
      })
    );

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          dashboardState: () => dashboardState,
          isAuthenticated: () => dashboardState.account.isAuthenticated,
          username: () => dashboardState.account.username,
          userProfile: () => cache.userProfile,
        },
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
