import React from 'react';
import { DashboardState } from 'src/dashboard/DashboardState';

export type PropsT = {};

export const useDashboardState = (props: PropsT) => {
  const [dashboardState] = React.useState(() => {
    return new DashboardState({});
  });

  React.useEffect(() => () => dashboardState.destroy(), [dashboardState]);

  return {
    dashboardState,
  };
};
