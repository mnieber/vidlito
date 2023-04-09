import React from 'react';
import { PageEventHandler } from './PageEventHandler';
import { usePageEventHandler } from './usePageEventHandler';

type EventHandlerLayer = Record<string, Function>;

export function useInstallEventHandlers(
  layerName: string,
  eventHandlers: EventHandlerLayer
) {
  const uiEventHandler = usePageEventHandler<PageEventHandler>();

  React.useEffect(() => {
    uiEventHandler.installEventHandlers(layerName, eventHandlers);
    return () => {
      uiEventHandler.uninstallEventHandlers(layerName);
    };
  }, [uiEventHandler, layerName, eventHandlers]);
}
