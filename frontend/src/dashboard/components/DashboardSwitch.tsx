import { Route, Switch } from 'react-router-dom';
import { ActionsView } from '/src/actions/components';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { SyncClipWithUrlEffect } from '/src/clips/components';
import { VideoAndCopView } from '/src/clips/components/VideoAndCopView';
import { Dashboard } from '/src/dashboard/components/Dashboard';
import { MainView } from '/src/dashboard/components/MainView';
import { CardS } from '/src/frames/components/Card';
import { ForwardToLastUrlEffect } from '/src/frames/components/ForwardToLastUrlEffect';
import { PageNotFound } from '/src/frames/components/PageNotFound';
import { TermsAndConditionsPage } from '/src/frames/components/TermsAndConditionsPage';
import { ActionsNavPage } from '/src/frames/pages/ActionsNavPage';
import { MainNavPage } from '/src/frames/pages/MainNavPage';
import {
  ForwardToClipEffect,
  PlaylistFormView,
  SyncPlaylistWithUrlEffect,
} from '/src/playlists/components';
import { PlaylistNotFound } from '/src/playlists/components/PlaylistNotFound';
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
      <MainNavPage>
        {
          // 🔳 Dashboard 🔳
        }
        <Dashboard>
          <Switch>
            <MainView>
              <Route exact path={routes.termsAndConditions()}>
                <TermsAndConditionsPage />
              </Route>
              <PageNotFound />
              <Route exact={true} path={routes.home()}>
                <ForwardToLastUrlEffect />
              </Route>
              <Route exact={false} path={routes.search()}>
                <SelectPlaylistEffect />
                {
                  // 🔳 SearchView 🔳
                }
                <SearchView className="ml-4 mt-4" />
              </Route>
              <Route exact={true} path={routes.actions()}>
                <ActionsNavPage>
                  <SelectPlaylistEffect />
                  {
                    // 🔳 ActionsView 🔳
                  }
                  <ActionsView className={cn('ml-2 lg:ml-4 mt-4')} />
                </ActionsNavPage>
              </Route>
              <Route exact={false} path={routes.playlist()}>
                <SyncPlaylistWithUrlEffect />
                <Route path={routes.playlist()}>
                  <PlaylistNotFound />
                </Route>
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
                  {
                    // 🔳 PlaylistFormView 🔳
                  }
                  <PlaylistFormView
                    className={cn(CardS.size.medium(), 'mx-4 mt-4')}
                  />
                </Route>
                <Route exact={true} path={routes.clip()}>
                  <SyncClipWithUrlEffect />
                  {
                    // 🔳 VideoAndCopView 🔳
                  }
                  <VideoAndCopView />
                </Route>
              </Route>
            </MainView>
          </Switch>
        </Dashboard>
      </MainNavPage>
    );
  },
  DefaultProps
);
