import React from 'react';
import { UIEventHandler } from './UIEventHandler';

export const UIEventHandlerContext = React.createContext<UIEventHandler | null>(
  null
);

export function useUIEventHandler<T>(): T & UIEventHandler {
  const uiEventHandler = React.useContext(UIEventHandlerContext);
  return uiEventHandler as unknown as T & UIEventHandler;
}
