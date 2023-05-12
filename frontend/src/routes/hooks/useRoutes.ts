import React from 'react';
import { history } from '/src/app/components/App';
import { RouteTableContext } from '/src/routes/components/RouteTableProvider';
import { RouteTable } from '/src/routes/utils/RouteTable';

export const useRouteTable = () => {
  const routeTable: RouteTable = React.useContext(RouteTableContext);
  return routeTable;
};

export const useRoutes = () => {
  return useRouteTable().routeByName;
};

export const useRouteUfns = () => {
  return { routeUfns: useRouteTable().routeUfnByName, history };
};
