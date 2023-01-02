import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from 'src/dashboard/components/Dashboard';
import { useRoutes } from 'src/routes/hooks/useRoutes';

export const DashboardSwitch: React.FC = () => {
  const routes = useRoutes();
  return (
    <Switch>
      <Route exact={true} path={routes.myDashboard()}>
        <Dashboard />
      </Route>
      <Route exact={true} path={routes.playlist()}></Route>
    </Switch>
  );
};
