import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import { ActionsPaginator, ActionsView } from '/src/actions/components';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { SelectPlaylistEffect } from '/src/playlists/components';
import { getRouteFns } from '/src/routes/routeTable';
import { cn } from '/src/utils/classnames';

export const ActionsSwitch = observer(() => {
  const routeFns = getRouteFns<AuthRoutesT & DashboardRoutesT>();
  return (
    <>
      <Route exact={true} path={routeFns.playlistActions()}>
        <SelectPlaylistEffect />
        {
          // 🔳 ActionsView 🔳
        }
        <ActionsPaginator>
          <ActionsView className={cn('ml-2 lg:ml-4 mt-4')} />
        </ActionsPaginator>
      </Route>
    </>
  );
});
