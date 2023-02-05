import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import './ClipMenu.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsDeletion,
  ...dps.dashboardState,
};

export const ClipMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return props.dashboardState.menuProps ? (
      <ControlledMenu
        {...props.dashboardState.menuProps}
        anchorPoint={props.dashboardState.anchorPoint}
        direction="right"
        onClose={() => props.dashboardState.closeContextMenu()}
      >
        <MenuItem>
          <Icon name="trash" />
          Move to Trash
        </MenuItem>
      </ControlledMenu>
    ) : null;
  }, DefaultProps)
);
