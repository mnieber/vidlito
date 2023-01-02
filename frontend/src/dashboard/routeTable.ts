import { RouteTable } from 'src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();

  routeTable.addRoutes({
    myDashboard: () => '/dashboard/my-dashboard',
    playlist: () => '/dashboard/playlist',
  });

  return routeTable;
};
