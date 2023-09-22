import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Route } from 'react-router-dom';
import { ActionsPaginator, ActionsView } from '/src/actions/components';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { SyncPlaylistWithUrlEffect } from '/src/playlists/components';
import { getRouteFns } from '/src/routes/routeTable';
import { cn } from '/src/utils/classnames';

export type PropsT = {};

export const ActionsSwitch = observer(
  R.identity((props: PropsT) => {
    const routeFns = getRouteFns<AuthRoutesT & DashboardRoutesT>();
    return (
      <>
        <Route exact={true} path={routeFns.actions()}>
          <SyncPlaylistWithUrlEffect />
          {
            // 🔳 ActionsView 🔳
          }
          <ActionsPaginator>
            <ActionsView className={cn('ml-2 lg:ml-4 mt-4')} />
          </ActionsPaginator>
        </Route>
      </>
    );
  })
);
