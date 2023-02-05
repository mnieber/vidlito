import { useMenuState } from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipMenu } from 'src/clips/components';
import { rowSkewer } from 'src/frames/components';
import { AccountMenu } from 'src/frames/components/AccountMenu';
import { Logo } from 'src/frames/components/Logo';
import { cn } from 'src/utils/classnames';
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
      props.dashboardState.initContextMenu(toggleMenu, menuProps);
    }, [props.dashboardState, toggleMenu, menuProps]);

    return (
      <div
        className={cn('AppFrame', 'grid grid-rows-[60px,1fr]', props.className)}
      >
        <ClipMenu />
        <></>
        {/* Bar */}
        <></>
        <div className={cn('AppFrame__TopBar', 'grid grid-cols-[1fr,1fr]')}>
          <div className={cn('AppFrame__TopBarLhsWrapper', rowSkewer)}>
            <Logo />
          </div>
          <div className={cn('AppFrame__TopBarRhs', rowSkewer, 'justify-end')}>
            <AccountMenu />
          </div>
        </div>
        <div className={cn('AppFrame__BottomMain', 'flex flex-col', 'mt-2')}>
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
