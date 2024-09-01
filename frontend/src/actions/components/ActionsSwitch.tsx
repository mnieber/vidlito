import { observer } from 'mobx-react-lite';
import { Route } from 'wouter';
import { ActionsPaginator, ActionsView } from '/src/actions/components';
import { dashboardRoutes } from '/src/dashboard/routes';
import { SelectPlaylistEffect } from '/src/playlists/components';
import { cn } from '/src/utils/classnames';

export const ActionsSwitch = observer(() => {
  return (
    <>
      <Route path={dashboardRoutes.playlistActions}>
        <SelectPlaylistEffect />
        {
          // 🔳 ActionsView 🔳
        }
        <ActionsPaginator>
          <ActionsView className={cn('ml-2 mt-4 lg:ml-4')} />
        </ActionsPaginator>
      </Route>
    </>
  );
});
