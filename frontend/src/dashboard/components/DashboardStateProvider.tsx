import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { withDefaultProps } from 'src/app/defaultProps';
import { flags } from 'src/app/flags';
import { useLoadUserId } from 'src/auth/api';
import { DashboardState } from 'src/dashboard/DashboardState';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const DashboardStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const loadUserId = useLoadUserId();

    const [dashboardState] = React.useState(() => new DashboardState({}));

    useUpdateStateReaction({
      getInputs: () => {
        return {
          userProfile: loadUserId.data?.userProfile,
          username: loadUserId.data?.username,
        };
      },
      updateState: (inputs) => {
        dashboardState.username = inputs.username;
        dashboardState.userProfile = inputs.userProfile;
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
