import { Route, Switch } from 'react-router-dom';
import { ActionsPaginator, ActionsView } from '/src/actions/components';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { SyncClipWithUrlEffect } from '/src/clips/components';
import { VideoAndCopView } from '/src/clips/components/VideoAndCopView';
import { Dashboard } from '/src/dashboard/components/Dashboard';
import { MainView } from '/src/dashboard/components/MainView';
import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { CardS } from '/src/frames/components/Card';
import { ForwardToLastUrlEffect } from '/src/frames/components/ForwardToLastUrlEffect';
import { PageNotFound } from '/src/frames/components/PageNotFound';
import { TermsAndConditionsPage } from '/src/frames/components/TermsAndConditionsPage';
import { DashboardNavHandler } from '/src/frames/pages/DashboardNavHandler';
import {
  ForwardToClipEffect,
  PlaylistFormView,
  SyncPlaylistWithUrlEffect,
} from '/src/playlists/components';
import { PlaylistNotFound } from '/src/playlists/components/PlaylistNotFound';
import { SelectPlaylistEffect } from '/src/playlists/components/SelectPlaylistEffect';
import { getRouteFns } from '/src/routes/routeTable';
import { SearchResultsPaginator } from '/src/search/components';
import { SearchView } from '/src/search/components/SearchView';
import { cn } from '/src/utils/classnames';

export type PropsT = {};

const DefaultProps = {
  ...dps.username,
};

export const DashboardSwitch = withDefaultProps(
  (props: PropsT & typeof DefaultProps) => {
    const routeFns = getRouteFns<AuthRoutesT & DashboardRoutesT>();
    return (
      <DashboardNavHandler>
        {
          // 🔳 Dashboard 🔳
        }
        <Dashboard>
          <Switch>
            <MainView>
              <Route exact path={routeFns.termsAndConditions()}>
                <TermsAndConditionsPage />
              </Route>
              <PageNotFound />
              <Route exact={true} path={routeFns.home()}>
                <ForwardToLastUrlEffect />
              </Route>
              <Route exact={false} path={routeFns.search()}>
                <SelectPlaylistEffect />
                {
                  // 🔳 SearchView 🔳
                }
                <SearchResultsPaginator>
                  <SearchView className="ml-4 mt-4" />
                </SearchResultsPaginator>
              </Route>
              <Route exact={true} path={routeFns.actions()}>
                <SelectPlaylistEffect />
                {
                  // 🔳 ActionsView 🔳
                }
                <ActionsPaginator>
                  <ActionsView className={cn('ml-2 lg:ml-4 mt-4')} />
                </ActionsPaginator>
              </Route>
              <Route exact={false} path={routeFns.playlist()}>
                <SyncPlaylistWithUrlEffect />
                <Route path={routeFns.playlist()}>
                  <PlaylistNotFound />
                </Route>
                <Route exact={true} path={routeFns.playlist()}>
                  <ForwardToClipEffect />
                </Route>
                <Route
                  exact={true}
                  path={routeFns.playlist({
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
                <Route exact={true} path={routeFns.clip()}>
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
      </DashboardNavHandler>
    );
  },
  DefaultProps
);
