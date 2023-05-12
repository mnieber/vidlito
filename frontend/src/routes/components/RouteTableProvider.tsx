import React from 'react';
import { getRouteTable as getAuthRouteTable } from '/src/auth/routeTable';
import { getRouteTable as getDashboardRouteTable } from '/src/dashboard/routeTable';
import { RouteTable } from '/src/routes/utils/RouteTable';

export const RouteTableContext = React.createContext<RouteTable>(
  new RouteTable()
);

type PropsT = React.PropsWithChildren<{}>;

export const RouteTableProvider = (props: PropsT) => {
  const routeTable = new RouteTable();
  routeTable.addTable(getAuthRouteTable(), '');
  routeTable.addTable(getDashboardRouteTable(), '');

  return (
    <RouteTableContext.Provider value={routeTable}>
      {props.children}
    </RouteTableContext.Provider>
  );
};
