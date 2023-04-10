import React from 'react';
import { UrlEventHandler } from './UrlEventHandler';
import { useUrlEventHandler } from './useUrlEventHandler';

export function useInstallEventHandlers(
  name: string,
  path: string,
  eventHandlerClass: any
) {
  const uiEventHandler = useUrlEventHandler<UrlEventHandler>();

  React.useEffect(() => {
    uiEventHandler.installEventHandlers(name, path, eventHandlerClass);
    return () => {
      uiEventHandler.uninstallEventHandlers(name);
    };
  }, [uiEventHandler, name, path, eventHandlerClass]);
}
