import React from 'react';
import { PageEventHandler } from './PageEventHandler';
import { usePageEventHandler } from './usePageEventHandler';

interface WithEventHandlersProps {
  layerName: string;
  eventHandlers: Record<string, Function>;
}

export function withPageEventHandlers({
  layerName,
  eventHandlers,
}: WithEventHandlersProps) {
  const WithEventHandlers: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const pageEventHandler = usePageEventHandler<PageEventHandler>();

    React.useEffect(() => {
      pageEventHandler.installEventHandlers(layerName, eventHandlers);
      return () => {
        pageEventHandler.uninstallEventHandlers(layerName);
      };
    }, [pageEventHandler]);

    return <>{children}</>;
  };
  return WithEventHandlers;
}
