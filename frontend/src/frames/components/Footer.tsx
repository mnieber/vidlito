import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { authRoutes } from '/src/auth/routes';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { AccountMenu } from '/src/frames/components/AccountMenu';
import {
  BlueDialogButtonTrim,
  DialogButton,
} from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import { RouterLink } from '/src/routes/components/RouterLink';
import { cn } from '/src/utils/classnames';

// Import styles
import './Footer.scss';

export type PropsT = {};

export const ContextProps = {
  dashboardState: dashboardCtx.dashboardState,
};

export const Footer = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
            (C) 2023 Maarten Nieber
          </div>
          <div className={cn('mx-4')}>-</div>
          <RouterLink
            to={authRoutes.termsAndConditions}
            className={cn('text-center')}
          >
            Terms and Conditions
          </RouterLink>
          <div className={cn('grow')} />
          <AccountMenu />
        </div>
      </div>
    );
  }, ContextProps)
);
