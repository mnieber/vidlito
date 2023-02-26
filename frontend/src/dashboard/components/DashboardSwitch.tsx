import { Route, Switch } from 'react-router-dom';
import { ActionsView } from 'src/actions/components';
import { EditClipEffect, SelectClipEffect } from 'src/clips/components';
import { Dashboard } from 'src/dashboard/components/Dashboard';
import { MainView } from 'src/dashboard/components/MainView';
import {
  EditPlaylistEffect,
  ForwardToClipEffect,
  PlaylistFormView,
  SelectPlaylistEffect,
} from 'src/playlists/components';
import { useRoutes } from 'src/routes/hooks/useRoutes';

export const DashboardSwitch = () => {
  const routes = useRoutes();
  return (
    <Switch>
      <Route exact={false} path={routes.playlist()}>
        <SelectPlaylistEffect />
        <EditPlaylistEffect />
        <Route exact={true} path={routes.playlist()}>
          <ForwardToClipEffect />
        </Route>
        <Dashboard>
          <Route
            exact={true}
            path={routes.playlist({ playlistSlug: 'new-playlist' })}
          >
            <PlaylistFormView />
          </Route>
          <Route exact={true} path={routes.clip()}>
            <SelectClipEffect />
            <EditClipEffect />
            <MainView />
          </Route>
          <Route exact={true} path={routes.actions()}>
            <ActionsView />
          </Route>
        </Dashboard>
      </Route>
    </Switch>
  );
};
