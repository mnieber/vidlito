import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useQueryData } from 'src/api/hooks';
import { maybe, reg } from 'src/api/ResourceState';
import { withDefaultProps } from 'src/app/defaultProps';
import { useLoadUserId } from 'src/auth/endpoints';
import { DashboardState } from 'src/dashboard/DashboardState';
import { useUpdateCacheReaction } from 'src/frames/hooks/useUpdateCacheReaction';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const DashboardStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const loadUserId = useQueryData(useLoadUserId());

    const [dashboardState] = React.useState(() => new DashboardState({}));

    const [cache] = React.useState(() =>
      makeAutoObservable({ userProfile: null }, {}, { deep: false })
    );

    useUpdateStateReaction({
      getInputs: () => {
        return {
          userProfile: loadUserId.data?.userProfile,
          username: loadUserId.data?.username,
          isAuthenticated: loadUserId.data?.isAuthenticated,
        };
      },
      updateState: (inputs) => {
        dashboardState.username = inputs.username;
        dashboardState.userProfile = inputs.userProfile;
        dashboardState.isAuthenticated = inputs.isAuthenticated;
      },
      logState: () =>
        log('DashboardState updated', dashboardState.getSummary()),
      destroyState: () => dashboardState.destroy(),
    });

    useUpdateCacheReaction({
      getInputs: () => {
        return {
          userProfile: loadUserId.data?.userProfile,
        };
      },
      updateCache: (inputs) => {
        cache.userProfile = reg(inputs.userProfile, {
          loading: [
            //
            maybe(loadUserId, 'loading', !inputs.userProfile),
          ],
        });
      },
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
