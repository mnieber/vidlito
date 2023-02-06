import { autorun, makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  addCleanUpFunctionToCtr,
  NestedDefaultPropsContext,
} from 'react-default-props-context';
import { useQueryData } from 'src/api/hooks';
import { cloneAndSetState, maybe } from 'src/api/ResourceState';
import { withDefaultProps } from 'src/app/defaultProps';
import { useLoadUserId } from 'src/auth/endpoints';
import { DashboardState } from 'src/dashboard/DashboardState';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const DashboardStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const loadUserId = useQueryData(useLoadUserId());

    const [dashboardState] = React.useState(() => new DashboardState({}));
    React.useEffect(() => () => dashboardState.destroy(), [dashboardState]);

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: loadUserId.data?.userProfile,
        username: loadUserId.data?.username,
        isAuthenticated: loadUserId.data?.isAuthenticated,
      }),
      updateState: (inputs) => {
        dashboardState.username = inputs.username;
        dashboardState.userProfile = inputs.userProfile;
        dashboardState.isAuthenticated = inputs.isAuthenticated;
      },
      logState: () =>
        log('DashboardState updated', dashboardState.getSummary()),
    });

    const [cache] = React.useState(() => {
      const cache = makeAutoObservable(
        { userProfile: null },
        {},
        { deep: false }
      );

      const cleanUpAutoRun = autorun(() => {
        cache.userProfile = cloneAndSetState(loadUserId.data?.userProfile, {
          loading: [
            //
            maybe(loadUserId, 'loading', !loadUserId.data?.userProfile),
          ],
        });
      });
      addCleanUpFunctionToCtr(dashboardState, cleanUpAutoRun);

      return cache;
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          dashboardState: () => dashboardState,
          isAuthenticated: () => dashboardState.isAuthenticated,
          username: () => dashboardState.username,
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
