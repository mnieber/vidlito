import React from 'react';
import { DashboardState } from '/src/dashboard/DashboardState/DashboardState';

export type PropsT = {
  dashboardState: DashboardState;
};

export const useOnResizeMainView = (props: PropsT) => {
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const onResizeMainView = (width?: number) => {
    if (width !== undefined) {
      const newWidth = width - 8;
      const isChanged =
        Math.round(newWidth) !=
        Math.round(props.dashboardState.panelState.panelWidth ?? 0);

      if (isChanged) {
        props.dashboardState.panelState.setPanelWidth(newWidth);
        props.dashboardState.panelState.setIsResizing(true);
        if (timeoutRef.current !== undefined) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          props.dashboardState.panelState.setIsResizing(false);
        }, 400);
      }
    }
  };

  return { onResizeMainView };
};
