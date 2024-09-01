import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Route } from 'wouter';
import { dashboardRoutes } from '/src/dashboard/routes';
import { SelectPlaylistEffect } from '/src/playlists/components';
import { ext } from '/src/routes/navHandler';
import { SearchResultsPaginator } from '/src/search/components';
import { SearchView } from '/src/search/components/SearchView';

export type PropsT = {};

export const SearchSwitch = observer(
  R.identity((props: PropsT) => {
    return (
      <>
        <Route path={ext(dashboardRoutes.search)}>
          <SelectPlaylistEffect />
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
