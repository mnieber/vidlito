import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useSignOut } from '/src/auth/endpoints';
import { useAuthStateContext } from '/src/auth/hooks';
import { navToSignIn } from '/src/frames/FramesNavEvents';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './AccountMenu.scss';

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
      return <MenuItem {...props} className="bg-transparent text-blue-50" />;
    };

    return props.dashboardState.accountMenu.menuProps ? (
      <div className={cn('AccountMenu', props.className)} style={props.style}>
        <Menu
          menuButton={
            <MenuButton
              className={cn(
                L.DialogButton.root(),
                L.DialogButton.color.darkBlueOnTeal(),
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
              <Icon className={cn(L.DialogButton.icon.root())} name="signIn" />
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
              <Icon className={cn(L.DialogButton.icon.root())} name="signOut" />
              Sign Out
            </StyledMenuItem>
          )}
        </Menu>
      </div>
    ) : null;
  }, DefaultProps)
);
