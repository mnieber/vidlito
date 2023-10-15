import { observer } from 'mobx-react-lite';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { ClipMenu } from '/src/clips/components';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { CookieNotice } from '/src/frames/components/CookieNotice';
import { DashboardNavHandler } from '/src/frames/pages/DashboardNavHandler';

// Import styles
import './AppFrame.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const ContextProps = {
  dashboardState: dashboardCtx.dashboardState,
};

export const AppFrame = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <React.Fragment>
        <DashboardNavHandler>
          <ClipMenu />
        </DashboardNavHandler>
        {props.children}
        {!props.dashboardState.cookiesState.hasSetCookiePreferences && (
          <CookieNotice />
        )}
      </React.Fragment>
    );
  }, ContextProps)
);
