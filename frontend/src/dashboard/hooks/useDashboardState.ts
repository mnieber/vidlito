import { useMenuState } from '@szhsin/react-menu';
import React from 'react';
import { DashboardState } from '/src/dashboard/DashboardState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = {};

export const useDashboardState = (props: PropsT) => {
  const [menuProps, toggleMenu] = useMenuState();
  const dashboardState = useBuilder(() => {
    return new DashboardState({});
  });

  React.useEffect(() => {
    dashboardState.clipListContextMenu.init(toggleMenu, menuProps);
  }, [dashboardState, toggleMenu, menuProps]);

  React.useEffect(() => () => dashboardState.destroy(), [dashboardState]);

  return {
    dashboardState,
  };
};
