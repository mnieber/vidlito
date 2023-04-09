import React from 'react';
import { PageEventHandler } from './PageEventHandler';

export const PageEventHandlerContext =
  React.createContext<PageEventHandler | null>(null);

export function usePageEventHandler<T>(): T & PageEventHandler {
  const pageEventHandler = React.useContext(PageEventHandlerContext);
  return pageEventHandler as unknown as T & PageEventHandler;
}
