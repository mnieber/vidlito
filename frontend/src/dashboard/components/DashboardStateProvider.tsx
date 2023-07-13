import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { useObservableQuery } from '/src/api/hooks';
import { updateSources } from '/src/api/utils';
import { withDefaultProps } from '/src/app/defaultProps';
import { useLoadUserId } from '/src/auth/endpoints';
import { useDashboardState } from '/src/dashboard/hooks/useDashboardState';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { log } from '/src/utils/logging';
import { ObjT } from '/src/utils/types';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const DashboardStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { dashboardState } = useDashboardState({});

    const loadUserId = useObservableQuery(useLoadUserId());

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
            {
              resource: dashboardState.account.userProfile,
              resourceName: 'userProfile',
            },
            ['loading', () => isQueryLoading(loadUserId), 'loadUserId'],
            ['updating', () => isQueryUpdating(loadUserId), 'loadUserId']
          );
        },
        get followSet() {
          return cache.userProfile?.followSet ?? [];
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
          followSet: () => cache.followSet,
          isOwner: () => (obj: ObjT) =>
            !!obj &&
            !!cache.userProfile &&
            cache.userProfile.username === obj.owner?.username,
        },
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
