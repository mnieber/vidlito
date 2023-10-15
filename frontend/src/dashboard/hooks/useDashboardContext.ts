import React from 'react';
import { PlaylistT } from '/src/api/types';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { DashboardState } from '/src/dashboard/DashboardState';
import { ObjT } from '/src/utils/types';

export const DashboardContext = React.createContext<any>(null);

export const useDashboardContext = () => {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardContext.Provider'
    );
  }
  return context;
};

export const dashboardCtx = {
  userProfile: [useDashboardContext, 'userProfile'] as any as UserProfileT,
  dashboardState: [
    useDashboardContext,
    'dashboardState',
  ] as any as DashboardState,
  followSet: [useDashboardContext, 'followSet'] as any as PlaylistT[],
  isOwner: [useDashboardContext, 'isOwner'] as any as (obj: ObjT) => boolean,
  username: [useDashboardContext, 'username'] as any as string,
  isAuthenticated: [useDashboardContext, 'isAuthenticated'] as any as boolean,
};
