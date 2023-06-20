import React from 'react';
import { getRouteTable as getAuthRouteTable } from '/src/auth/routeTable';
import { getRouteTable as getDashboardRouteTable } from '/src/dashboard/routeTable';
import { RouteTable } from '/src/routes/utils/RouteTable';

export const createRouteTable = () => {
  const routeTable = new RouteTable();
  routeTable.addTable(getAuthRouteTable(), '');
  routeTable.addTable(getDashboardRouteTable(), '');
  return routeTable;
};

export const routeTable = createRouteTable();
export const RouteTableContext = React.createContext<RouteTable>(routeTable);

type PropsT = React.PropsWithChildren<{}>;

export const RouteTableProvider = (props: PropsT) => {
  return (
    <RouteTableContext.Provider value={routeTable}>
      {props.children}
    </RouteTableContext.Provider>
  );
};
