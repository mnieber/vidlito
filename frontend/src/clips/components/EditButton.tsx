import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Edit } from 'skandha-facets';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ToolButton } from '/src/frames/components/ToolButton';
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
          'EditButton',
          {
            'EditButton--invisible': R.isNil(props.username),
          },
          props.className
        )}
        disabled={props.disabled}
        iconName="pencil"
        iconSize="small"
        label="Edit"
        onClick={() => {
          props.edit.enable();
        }}
      />
    );
  }, DefaultProps)
);
