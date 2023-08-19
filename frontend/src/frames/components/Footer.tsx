import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { AccountMenu } from '/src/frames/components/AccountMenu';
import { DialogButton } from '/src/frames/components/DialogButton';
import { BlueDialogButtonTheme } from '/src/frames/components/DialogButton/DialogButton';
import { L } from '/src/frames/layout';
import { RouterLink } from '/src/routes/components/RouterLink';
import { useRoutes } from '/src/routes/hooks/useRoutes';
import { cn } from '/src/utils/classnames';

// Import styles
import './Footer.scss';

export type PropsT = {};

export const DefaultProps = {
  ...dps.dashboardState,
};

export const Footer = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const routes = useRoutes();

    return (
      <div className={cn('Footer', 'p-4')}>
        <div className={cn(L.row.skewer(), 'justify-between')}>
          <DialogButton
            className={cn('Footer__MenuButton')}
            label={props.dashboardState.panelState.isSidebarOpen ? '<' : '>'}
            theme={BlueDialogButtonTheme}
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
