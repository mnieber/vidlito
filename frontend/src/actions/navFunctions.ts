import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { history } from '/src/routes/history';
import { getRouteFns } from '/src/routes/routeTable';

export const navToActions = (username: string): void => {
  history.push(getRouteFns<DashboardRoutesT>().actions());
};
