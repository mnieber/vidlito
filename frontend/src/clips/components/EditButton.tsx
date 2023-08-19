import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Edit } from 'skandha-facets';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  DefaultToolButtonTheme,
  ToolButton,
  ToolButtonS,
} from '/src/frames/components/ToolButton';
import { cn } from '/src/utils/classnames';

// Import styles
import './EditButton.scss';

export type PropsT = {
  disabled: boolean;
  edit: Edit;
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
  ...dps.username,
  ...dps.isOwner,
};

export const EditButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      //
      // 🔳 EditButton 🔳
      //
      <ToolButton
        className={cn(
          [
            'EditButton',
            {
              'EditButton--invisible': R.isNil(props.username),
            },
          ],
          [props.className]
        )}
        theme={ToolButtonTheme}
        disabled={props.disabled}
        iconName="pencil"
        label="Edit"
        onClick={() => props.edit.enable()}
      />
    );
  }, DefaultProps)
);

export const ToolButtonTheme = {
  ...DefaultToolButtonTheme,
  base: {
    ...DefaultToolButtonTheme.base,
    Icon: () =>
      cn(
        ToolButtonS.Icon.size.small(),
        ToolButtonS.Icon.margin.medium(),
        ToolButtonS.Icon.color.grayFill()
      ),
  },
};
