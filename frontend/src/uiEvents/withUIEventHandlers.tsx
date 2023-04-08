import React from 'react';
import { UIEventHandler } from './UIEventHandler';
import { useUIEventHandler } from './useUIEventHandler';

interface WithEventHandlersProps {
  layerName: string;
  eventHandlers: Record<string, Function>;
}

export function withUIEventHandlers({
  layerName,
  eventHandlers,
}: WithEventHandlersProps) {
  const WithEventHandlers: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const uiEventHandler = useUIEventHandler<UIEventHandler>();

    React.useEffect(() => {
      uiEventHandler.installEventHandlers(layerName, eventHandlers);
      return () => {
        uiEventHandler.uninstallEventHandlers(layerName);
      };
    }, [uiEventHandler]);

    return <>{children}</>;
  };
  return WithEventHandlers;
}
