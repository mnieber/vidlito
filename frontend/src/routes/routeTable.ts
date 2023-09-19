import { getRouteTable as getAuthRouteTable } from '/src/auth/routeTable';
import { getRouteTable as getDashboardRouteTable } from '/src/dashboard/routeTable';
import { RouteFnByNameT, RouteTable } from '/src/routes/utils/RouteTable';

export const createRouteTable = () => {
  const routeTable = new RouteTable();
  routeTable.addTable(getAuthRouteTable(), '');
  routeTable.addTable(getDashboardRouteTable(), '');
  return routeTable;
};

export const routeTable = createRouteTable();

export const getRouteFns = <T>() => {
  return routeTable.routeFnByName as RouteFnByNameT<T>;
};
