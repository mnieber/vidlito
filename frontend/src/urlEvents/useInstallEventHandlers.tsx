import React from 'react';
import { CreateEventLayerFunctionT } from 'src/urlEvents/UrlEventHandler';
import { UrlEventHandler } from './UrlEventHandler';
import { useUrlEventHandler } from './useUrlEventHandler';

export function useInstallEventHandlers(
  name: string,
  path: string,
  createEventLayer: CreateEventLayerFunctionT
) {
  const uiEventHandler = useUrlEventHandler<UrlEventHandler>();

  React.useEffect(() => {
    uiEventHandler.installEventHandlers(name, path, createEventLayer);
    return () => {
      uiEventHandler.uninstallEventHandlers(name);
    };
  }, [uiEventHandler, name, path, createEventLayer]);
}
