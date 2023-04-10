import React from 'react';
import { UrlEventHandler } from './UrlEventHandler';

export const UrlEventHandlerContext =
  React.createContext<UrlEventHandler | null>(null);

export function useUrlEventHandler<T>(): T & UrlEventHandler {
  const urlEventHandler = React.useContext(UrlEventHandlerContext);
  return urlEventHandler as unknown as T & UrlEventHandler;
}
