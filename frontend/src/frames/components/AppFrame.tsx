import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipMenu } from '/src/clips/components';
import { CookieNotice } from '/src/frames/components/CookieNotice';
import { DashboardNavHandler } from '/src/frames/pages/DashboardNavHandler';

// Import styles
import './AppFrame.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.dashboardState,
};

export const AppFrame = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
  }, DefaultProps)
);
