import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useQueryData } from 'src/api/hooks';
import { cloneAndSetState } from 'src/api/utils';
import { withDefaultProps } from 'src/app/defaultProps';
import { useLoadUserId } from 'src/auth/endpoints';
import { useDashboardState } from 'src/dashboard/hooks/useDashboardState';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const DashboardStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { dashboardState } = useDashboardState({});

    const loadUserId = useQueryData(useLoadUserId());

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: loadUserId.data?.userProfile,
        username: loadUserId.data?.username,
        isAuthenticated: loadUserId.data?.isAuthenticated,
      }),
      updateState: (inputs) => {
        dashboardState.account.username = inputs.username;
        dashboardState.account.userProfile = inputs.userProfile;
        dashboardState.account.isAuthenticated = inputs.isAuthenticated;
      },
      logState: () =>
        log('DashboardState updated', dashboardState.getSummary()),
    });

    const [cache] = React.useState(() =>
      makeAutoObservable({
        get userProfile() {
          return cloneAndSetState(loadUserId.data?.userProfile, [
            [
              ['loading', 'loadUserId'],
              !loadUserId.data?.userProfile ? loadUserId : undefined,
            ],
          ]);
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
