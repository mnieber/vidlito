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
    const l = L.ToolButton;

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
          //
          //
          l.root(),
          !props.enabled && l.disabled(),
          props.className
        )}
        disabled={!props.enabled}
        onClick={() => {
          props.edit.enable();
        }}
      >
        <Icon
          className={cn(
            l.icon.root(),
            l.icon.size.small(),
            !props.enabled && l.icon.disabled()
          )}
          name="pencil"
        />
        Edit
      </button>
    );
  }, DefaultProps)
);
