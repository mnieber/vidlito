import React from 'react';
import { PageEventHandler } from './PageEventHandler';
import { usePageEventHandler } from './usePageEventHandler';

export function useInstallEventHandlers(
  name: string,
  path: string,
  eventHandlerClass: any
) {
  const uiEventHandler = usePageEventHandler<PageEventHandler>();

  React.useEffect(() => {
    uiEventHandler.installEventHandlers(name, path, eventHandlerClass);
    return () => {
      uiEventHandler.uninstallEventHandlers(name);
    };
  }, [uiEventHandler, name, path, eventHandlerClass]);
}
