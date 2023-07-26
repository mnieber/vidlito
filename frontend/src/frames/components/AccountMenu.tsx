import { Menu, MenuButton, MenuDivider, MenuItem } from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useSignOut } from '/src/auth/endpoints';
import { useAuthStateContext } from '/src/auth/hooks';
import { navToHelp, navToSignIn } from '/src/frames/FramesNavEvents';
import { Icon } from '/src/frames/components';
import { DialogButtonL } from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './AccountMenu.scss';
import '/src/frames/components/DialogButtonBase.scss';

export type PropsT = {
  className?: any;
  style?: any;
};

const DefaultProps = {
  ...dps.isAuthenticated,
  ...dps.dashboardState,
};

export const AccountMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const authState = useAuthStateContext(true);
    const signOut = useSignOut(authState).mutateAsync;

    const StyledMenuItem = (props: any) => {
      return (
        <MenuItem {...props} className="bg-transparent text-blue-darkest" />
      );
    };

    return props.dashboardState.accountMenu.menuProps ? (
      <div className={cn('AccountMenu', props.className)} style={props.style}>
        <Menu
          menuButton={
            <MenuButton
              className={cn(
                'DialogButtonBase',
                'btnTealWithDarkText',
                L.row.skewer(),
                'mb-4'
              )}
            >
              Account
            </MenuButton>
          }
          className="mt-4 font-bold bg-white"
          offsetY={10}
          transition
        >
          {!props.isAuthenticated && (
            <StyledMenuItem onClick={() => navToSignIn()}>
              <Icon className={cn(DialogButtonL.icon.root())} name="signIn" />
              Sign In
            </StyledMenuItem>
          )}
          {props.isAuthenticated && (
            <StyledMenuItem
              onClick={() => {
                signOut({}).then(() => {
                  navToSignIn();
                });
              }}
            >
              <Icon className={cn(DialogButtonL.icon.root())} name="signOut" />
              Sign Out
            </StyledMenuItem>
          )}
          <MenuDivider />
          <StyledMenuItem onClick={() => navToHelp()}>
            <Icon className={cn(DialogButtonL.icon.root())} name="help" />
            Help
          </StyledMenuItem>
        </Menu>
      </div>
    ) : null;
  }, DefaultProps)
);
