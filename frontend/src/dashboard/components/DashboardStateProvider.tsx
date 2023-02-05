import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useQueryData } from 'src/api/hooks';
import { withDefaultProps } from 'src/app/defaultProps';
import { flags } from 'src/app/flags';
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
        if (flags.logStateProviders) {
          log('DashboardState updated', dashboardState.getSummary());
        }
      },
      destroyState: () => dashboardState.destroy(),
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          dashboardState: () => dashboardState,
          userProfile: () => dashboardState.userProfile,
          username: () => dashboardState.username,
          isAuthenticated: () => dashboardState.isAuthenticated,
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
