import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useSignOut } from 'src/auth/endpoints';
import { useAuthStateContext } from 'src/auth/hooks';
import { FramesUrlEvents } from 'src/frames/FramesUrlEvents';
import { Icon } from 'src/frames/components';
import { lvi } from 'src/frames/components/Lvi';
import { useUrlEventHandler } from 'src/urlEvents';
import { cn } from 'src/utils/classnames';

// Import styles
import './AccountMenu.scss';

const useUrlEvents = () => useUrlEventHandler<typeof FramesUrlEvents>();

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.isAuthenticated,
  ...dps.dashboardState,
};

export const AccountMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEvents();
    const authState = useAuthStateContext(true);
    const signOut = useSignOut(authState).mutateAsync;

    return props.dashboardState.accountMenu.menuProps ? (
      <div className={cn('AccountMenu', props.className)}>
        <Menu menuButton={<MenuButton>Account</MenuButton>} transition>
          <MenuItem onClick={() => urlEvents.goToSignIn()}>
            <Icon className={cn(lvi.leadingIcon)} name="check" />
            Sign In
          </MenuItem>
          <MenuItem
            onClick={() => {
              signOut({}).then(() => {
                urlEvents.goToSignIn();
              });
            }}
          >
            <Icon className={cn(lvi.leadingIcon)} name="check" />
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    ) : null;
  }, DefaultProps)
);
