import React from 'react';
import { DashboardState } from '/src/dashboard/DashboardState/DashboardState';
import { useResize } from '/src/frames/hooks/useResize';
import { getVideoWidth } from '/src/videos/utils/aspectRatio';

export type PropsT = {
  dashboardState: DashboardState;
  leftSidebarWidth: number;
};

export const useOnResizeDashboard = (props: PropsT) => {
  const { panelWidth, onResize } = useResize({});
  const maxVideoWidth = props.dashboardState.isFullVideoWidth ? 1200 : 800;
  const nextPanelWidth = getVideoWidth(
    maxVideoWidth,
    (panelWidth ?? window.innerWidth) - 150 - props.leftSidebarWidth
  );

  React.useEffect(() => {
    props.dashboardState.setPanelWidth(nextPanelWidth);
  }, [props.dashboardState, nextPanelWidth]);

  return {
    onResize,
  };
};
