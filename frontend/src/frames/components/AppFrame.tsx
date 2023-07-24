import { useMenuState } from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipMenu } from '/src/clips/components';
import { CookieNotice } from '/src/frames/components/CookieNotice';

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
    // Since we show the clip context menu in this component, we also call the hooks
    // to initialize the menu state here. For some reason, there is a crash if we try
    // to do this in the DashboardStateProvider component.
    const [menuProps, toggleMenu] = useMenuState();
    React.useEffect(() => {
      props.dashboardState.clipListContextMenu.init(toggleMenu, menuProps);
    }, [props.dashboardState, toggleMenu, menuProps]);

    return (
      <React.Fragment>
        <ClipMenu />
        {props.children}
        {!props.dashboardState.cookiesState.hasSetCookiePreferences && (
          <CookieNotice />
        )}
      </React.Fragment>
    );
  }, DefaultProps)
);
