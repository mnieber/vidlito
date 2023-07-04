import { Route, Switch } from 'react-router-dom';
import { ActionsView } from '/src/actions/components';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { SyncClipWithUrlEffect } from '/src/clips/components';
import { Dashboard } from '/src/dashboard/components/Dashboard';
import { MainView } from '/src/dashboard/components/MainView';
import { ClipCard } from '/src/dashboard/components/MainView/ClipCard';
import { UseActionsPage } from '/src/frames/pages/UseActionsPage';
import { UseMainPage } from '/src/frames/pages/UseMainPage';
import {
  ForwardToClipEffect,
  PlaylistFormView,
  SyncPlaylistWithUrlEffect,
} from '/src/playlists/components';
import { SelectPlaylistEffect } from '/src/playlists/components/SelectPlaylistEffect';
import { useRoutes } from '/src/routes/hooks/useRoutes';
import { SearchView } from '/src/search/components/SearchView';
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
        <UseMainPage>
          {/* 🔳 */}
          <Dashboard>
            <MainView>
              <Route exact={false} path={routes.search()}>
                <SelectPlaylistEffect />
                <SearchView className="ml-4 mt-4" />
              </Route>
              <Route exact={true} path={routes.actions()}>
                <UseActionsPage>
                  {/* 🔳 */}
                  <SelectPlaylistEffect />
                  <ActionsView className={cn('ml-2 lg:ml-4 mt-4')} />
                </UseActionsPage>
              </Route>
              <Route exact={false} path={routes.playlist()}>
                <SyncPlaylistWithUrlEffect />
                <Route exact={true} path={routes.playlist()}>
                  <ForwardToClipEffect />
                </Route>
                <Route
                  exact={true}
                  path={routes.playlist({
                    ownerUsername: ':ownerUsername',
                    playlistSlug: 'new-playlist',
                  })}
                >
                  {/* 🔳 */}
                  <PlaylistFormView className="ml-4 mt-4" />
                </Route>
                <Route exact={true} path={routes.clip()}>
                  <SyncClipWithUrlEffect />
                  {/* 🔳 */}
                  <ClipCard />
                </Route>
              </Route>
            </MainView>
          </Dashboard>
        </UseMainPage>
      </Switch>
    );
  },
  DefaultProps
);
