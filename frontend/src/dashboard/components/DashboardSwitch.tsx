import { Route, Switch } from 'react-router-dom';
import { ClipView, SelectClipEffect } from 'src/clips/components';
import { Dashboard } from 'src/dashboard/components/Dashboard';
import { SelectPlaylistEffect } from 'src/playlists/components/SelectPlaylistEffect';
import { useRoutes } from 'src/routes/hooks/useRoutes';

export const DashboardSwitch = () => {
  const routes = useRoutes();
  return (
    <Switch>
      <Route exact={true} path={routes.myDashboard()}>
        <Dashboard />
      </Route>
      <Route exact={false} path={routes.playlist()}>
        <SelectPlaylistEffect />
        <Dashboard>
          <Route exact={true} path={routes.clip()}>
            <SelectClipEffect />
            <ClipView />
          </Route>
        </Dashboard>
      </Route>
    </Switch>
  );
};
