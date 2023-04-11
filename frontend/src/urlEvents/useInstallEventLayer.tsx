import React from 'react';
import { CreateEventLayerFunctionT } from 'src/urlEvents/UrlEventHandler';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { UrlEventHandler } from './UrlEventHandler';
import { useUrlEventHandler } from './useUrlEventHandler';

export function useInstallEventLayer(
  name: string,
  path: string,
  createEventLayer: CreateEventLayerFunctionT
) {
  const uiEventHandler = useUrlEventHandler<UrlEventHandler>();
  const eventLayer = useBuilder(() => createEventLayer(name, path));

  React.useEffect(() => {
    uiEventHandler.installEventLayer(eventLayer);
    return () => {
      uiEventHandler.uninstallEventLayer(eventLayer.name);
    };
  }, [uiEventHandler, eventLayer]);
}
