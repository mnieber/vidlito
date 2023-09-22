import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Route } from 'react-router-dom';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { SyncPlaylistWithUrlEffect } from '/src/playlists/components';
import { getRouteFns } from '/src/routes/routeTable';
import { SearchResultsPaginator } from '/src/search/components';
import { SearchView } from '/src/search/components/SearchView';

export type PropsT = {};

export const SearchSwitch = observer(
  R.identity((props: PropsT) => {
    const routeFns = getRouteFns<AuthRoutesT & DashboardRoutesT>();
    return (
      <>
        <Route exact={false} path={routeFns.search()}>
          <SyncPlaylistWithUrlEffect />
          {
            // 🔳 SearchView 🔳
          }
          <SearchResultsPaginator>
            <SearchView className="ml-4 mt-4" />
          </SearchResultsPaginator>
        </Route>
      </>
    );
  })
);
