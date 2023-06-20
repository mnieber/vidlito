import { createBrowserHistory } from 'history';
import React from 'react';
import { createNavHandler, NavHandler } from '/src/navHandler/NavHandler';
import { routeTable } from '/src/routes/components/RouteTableProvider';

export const history = createBrowserHistory();

export const NavHandlerContext = React.createContext<NavHandler | null>(null);

export function useNavHandler<T>(): T & NavHandler {
  const navHandler = React.useContext(NavHandlerContext);
  return navHandler as unknown as T & NavHandler;
}

export const navHandler = createNavHandler({
  history: history,
  routes: routeTable.routeFnByName,
  routeUfns: routeTable.routeUfnByName,
});
