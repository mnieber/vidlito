import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import './ClipMenu.scss';

export type PropsT = {
  className?: any;
  menuProps: any;
  toggleMenu: Function;
};

const DefaultProps = {
  ...dps.clipsDeletion,
  ...dps.dashboardState,
};

export const ClipMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <ControlledMenu
        {...props.menuProps}
        anchorPoint={props.dashboardState.anchorPoint}
        direction="right"
        onClose={() => props.toggleMenu(false)}
      >
        <MenuItem>
          <Icon name="trash" />
          Move to Trash
        </MenuItem>
      </ControlledMenu>
    );
  }, DefaultProps)
);
