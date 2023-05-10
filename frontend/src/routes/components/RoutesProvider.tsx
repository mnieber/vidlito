import React from 'react';
import { getRouteTable as getAuthRouteTable } from '/src/auth/routeTable';
import { getRouteTable as getDashboardRouteTable } from '/src/dashboard/routeTable';
import { RouteTable } from '/src/routes/utils/RouteTable';

export const RoutesContext = React.createContext<RouteTable>(new RouteTable());

type PropsT = React.PropsWithChildren<{}>;

export const RoutesProvider = (props: PropsT) => {
  const routeTable = new RouteTable();
  routeTable.addTable(getAuthRouteTable(), '');
  routeTable.addTable(getDashboardRouteTable(), '');

  return (
    <RoutesContext.Provider value={routeTable}>
      {props.children}
    </RoutesContext.Provider>
  );
};
