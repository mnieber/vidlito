import React from 'react';
import { DashboardState } from 'src/dashboard/DashboardState';

export const useDashboardState = () => {
  const [dashboardState] = React.useState(() => new DashboardState({}));
  React.useEffect(() => () => dashboardState.destroy(), [dashboardState]);
  return dashboardState;
};
