import React from 'react';
import { DashboardState } from '/src/dashboard/DashboardState/DashboardState';

export type PropsT = {
  dashboardState: DashboardState;
};

export const useOnResizeMainView = (props: PropsT) => {
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const onResizeMainView = (width?: number) => {
    if (width !== undefined) {
      props.dashboardState.panelState.setPanelWidth(width - 8, true);
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        props.dashboardState.panelState.setPanelWidth(width - 8, false);
      }, 400);
    }
  };

  return { onResizeMainView };
};
