import React from 'react';
import { history } from '/src/app/components/App';
import { RouteTableContext } from '/src/routes/components/RouteTableProvider';
import { RouteTable, WrapUfn } from '/src/routes/utils/RouteTable';

export const useRouteTable = () => {
  const routeTable: RouteTable = React.useContext(RouteTableContext);
  return routeTable;
};

export const useRoutes = <T = any>(): T => {
  return useRouteTable().routeFnByName as T;
};

export const useRouteUfns = <T = any>(): WrapUfn<T> => {
  return { routeUfns: useRouteTable().routeUfnByName, history } as WrapUfn<T>;
};
