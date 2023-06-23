import { Route, Switch } from 'react-router-dom';
import { ActionsView } from '/src/actions/components';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { SyncClipWithUrlEffect } from '/src/clips/components';
import { Dashboard } from '/src/dashboard/components/Dashboard';
import { MainView } from '/src/dashboard/components/MainView';
import { VideoCard } from '/src/dashboard/components/MainView/VideoCard';
import { UseActionsPage } from '/src/frames/pages/UseActionsPage';
import { UseMainPage } from '/src/frames/pages/UseMainPage';
import {
  ForwardToClipEffect,
  PlaylistFormView,
  SyncPlaylistWithUrlEffect,
} from '/src/playlists/components';
import { useRoutes } from '/src/routes/hooks/useRoutes';
import { cn } from '/src/utils/classnames';

export type PropsT = {};

const DefaultProps = {
  ...dps.username,
};

export const DashboardSwitch = withDefaultProps(
  (props: PropsT & typeof DefaultProps) => {
    const routes = useRoutes();
    return (
      <Switch>
        <Route exact={false} path={routes.playlist()}>
          <UseMainPage>
            <SyncPlaylistWithUrlEffect />
            <Route exact={true} path={routes.playlist()}>
              <ForwardToClipEffect />
            </Route>
            {/* 🔳 */}
            <Dashboard>
              <MainView>
                <Route
                  exact={true}
                  path={routes.playlist({
                    ownerUsername: ':ownerUsername',
                    playlistSlug: 'new-playlist',
                  })}
                >
                  {/* 🔳 */}
                  <PlaylistFormView />
                </Route>
                <Route exact={true} path={routes.clip()}>
                  <SyncClipWithUrlEffect />
                  {/* 🔳 */}
                  <VideoCard />
                </Route>
                <Route exact={true} path={routes.actions()}>
                  <UseActionsPage>
                    {/* 🔳 */}
                    <ActionsView className={cn('ml-2 lg:ml-4 mt-4')} />
                  </UseActionsPage>
                </Route>
              </MainView>
            </Dashboard>
          </UseMainPage>
        </Route>
      </Switch>
    );
  },
  DefaultProps
);
