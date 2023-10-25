import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { history } from '/src/routes/history';
import { getRouteFns } from '/src/routes/routeTable';
import { getRouteMatch } from '/src/routes/utils/getRouteMatch';

export const navToPlaylistActions = (playlistSlug: string): void => {
  history.push(
    getRouteFns<DashboardRoutesT>().playlistActions({ playlistSlug })
  );
};

export const navToActions = (): void => {
  history.push(getRouteFns<DashboardRoutesT>().actions());
};

export const isOnActionsPage = () => {
  const routeFns = getRouteFns<DashboardRoutesT>();
  const routeMatch = getRouteMatch();
  return [routeFns.actions(), routeFns.playlistActions()].includes(
    routeMatch?.path ?? ''
  );
};
