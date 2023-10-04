import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { history } from '/src/routes/history';
import { getRouteFns } from '/src/routes/routeTable';

export const navToPlaylistActions = (playlistSlug: string): void => {
  history.push(
    getRouteFns<DashboardRoutesT>().playlistActions({ playlistSlug })
  );
};

export const navToActions = (): void => {
  history.push(getRouteFns<DashboardRoutesT>().actions());
};
