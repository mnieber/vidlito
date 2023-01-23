import { Redirect, Route, Switch } from 'react-router-dom';
import { EditableClipView, SelectClipEffect } from 'src/clips/components';
import { Dashboard } from 'src/dashboard/components/Dashboard';
import { SelectPlaylistEffect } from 'src/playlists/components/SelectPlaylistEffect';
import { useRoutes } from 'src/routes/hooks/useRoutes';

export const DashboardSwitch = () => {
  const routes = useRoutes();
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact={true} path={routes.myDashboard()}>
        <Dashboard />
      </Route>
      <Route exact={false} path={routes.playlist()}>
        <SelectPlaylistEffect />
        <Dashboard>
          <Route exact={true} path={routes.clip()}>
            <SelectClipEffect />
            <EditableClipView />
          </Route>
        </Dashboard>
      </Route>
    </Switch>
  );
};
