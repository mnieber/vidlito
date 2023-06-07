import React from 'react';
import { NavHandler } from './NavHandler';

export const NavHandlerContext = React.createContext<NavHandler | null>(null);

export function useNavHandler<T>(): T & NavHandler {
  const navHandler = React.useContext(NavHandlerContext);
  return navHandler as unknown as T & NavHandler;
}
