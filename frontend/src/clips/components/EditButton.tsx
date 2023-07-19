import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Edit } from 'skandha-facets';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { ToolButtonL } from '/src/frames/components/ToolButton';
import { cn } from '/src/utils/classnames';

// Import styles
import './EditButton.scss';

export type PropsT = {
  enabled: boolean;
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
      <button
        className={cn(
          'EditButton',
          {
            'EditButton--invisible': R.isNil(props.username),
          },
          [],
          [
            ToolButtonL.root(),
            !props.enabled && ToolButtonL.disabled(),
            props.className,
          ]
        )}
        disabled={!props.enabled}
        onClick={() => {
          props.edit.enable();
        }}
      >
        <Icon
          className={cn(
            ToolButtonL.icon.root(),
            ToolButtonL.icon.size.small(),
            !props.enabled && ToolButtonL.icon.disabled()
          )}
          name="pencil"
        />
        Edit
      </button>
    );
  }, DefaultProps)
);
