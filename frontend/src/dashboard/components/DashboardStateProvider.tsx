import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { updateSources } from 'mobx-resource-states';
import * as R from 'ramda';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { useObservableQuery } from '/src/api/hooks';
import { useLoadUserId } from '/src/auth/endpoints';
import { DashboardContext } from '/src/dashboard/hooks/useDashboardContext';
import { useDashboardState } from '/src/dashboard/hooks/useDashboardState';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { createGetProps } from '/src/utils/createGetProps';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { log } from '/src/utils/logging';
import { ObjT } from '/src/utils/types';

export type PropsT = React.PropsWithChildren<{}>;

const ContextProps = {};

export const DashboardStateProvider = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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

    const getDashboardContext = () => {
      return createGetProps(
        R.mergeAll([
          {
            dashboardState: () => dashboardState,
            isAuthenticated: () => dashboardState.account.isAuthenticated,
            username: () => dashboardState.account.username,
            userProfile: () => cache.userProfile,
            followSet: () => cache.followSet,
            isOwner: () => (obj: ObjT) =>
              !!obj &&
              !!cache.userProfile &&
              cache.userProfile.username === obj.ownerUsername,
          },
        ])
      );
    };

    return (
      <DashboardContext.Provider value={getDashboardContext()}>
        {props.children}
      </DashboardContext.Provider>
    );
  }, ContextProps)
);
