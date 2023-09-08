import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { AccountMenu } from '/src/frames/components/AccountMenu';
import {
  BlueDialogButtonTrim,
  DialogButton,
} from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import { RouterLink } from '/src/routes/components/RouterLink';
import { getRoutes } from '/src/routes/routeTable';
import { cn } from '/src/utils/classnames';

// Import styles
import './Footer.scss';

export type PropsT = {};

export const DefaultProps = {
  ...dps.dashboardState,
};

export const Footer = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const routes = getRoutes<AuthRoutesT>();

    return (
      <div className={cn('Footer', 'p-4')}>
        <div className={cn(L.row.skewer(), 'justify-between')}>
          <DialogButton
            className={cn('Footer__MenuButton')}
            label={props.dashboardState.panelState.isSidebarOpen ? '<' : '>'}
            trim={BlueDialogButtonTrim}
            onClick={() => {
              props.dashboardState.panelState.setIsSidebarOpen(
                !props.dashboardState.panelState.isSidebarOpen
              );
            }}
          />
          <div className={cn('Footer__MenuButtonSpacer', ['grow'])} />
          <div className={cn('Footer__Copyright', ['ml-2'])}>
            (C) 2024 Maarten Nieber
          </div>
          <div className={cn('mx-4')}>-</div>
          <RouterLink
            to={routes.termsAndConditions()}
            className={cn('text-center')}
          >
            Terms and Conditions
          </RouterLink>
          <div className={cn('grow')} />
          <AccountMenu />
        </div>
      </div>
    );
  }, DefaultProps)
);
