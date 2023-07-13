import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Edit } from 'skandha-facets';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
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
            'EditButton--disabled': !props.enabled,
            'EditButton--invisible': R.isNil(props.username),
          },
          //
          //
          L.ToolButton.root(),
          props.className
        )}
        disabled={!props.enabled}
        onClick={() => {
          props.edit.enable();
        }}
      >
        <Icon
          className={cn('EditButton__Icon', L.ToolButton.icon.small(), {
            'EditButton__Icon--disabled': !props.enabled,
          })}
          name="pencil"
        />
        Edit
      </button>
    );
  }, DefaultProps)
);
