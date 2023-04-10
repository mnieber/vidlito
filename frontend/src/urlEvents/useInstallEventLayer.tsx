import React from 'react';
import { CreateEventLayerFunctionT } from 'src/urlEvents/UrlEventHandler';
import { UrlEventHandler } from './UrlEventHandler';
import { useUrlEventHandler } from './useUrlEventHandler';

export function useInstallEventLayer(
  name: string,
  path: string,
  createEventLayer: CreateEventLayerFunctionT
) {
  const uiEventHandler = useUrlEventHandler<UrlEventHandler>();

  React.useEffect(() => {
    uiEventHandler.installEventLayer(name, path, createEventLayer);
    return () => {
      uiEventHandler.uninstallEventLayer(name);
    };
  }, [uiEventHandler, name, path, createEventLayer]);
}
