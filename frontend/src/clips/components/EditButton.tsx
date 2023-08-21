import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Edit } from 'skandha-facets';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  DefaultToolButtonTrim,
  ToolButton,
  ToolButtonS,
} from '/src/frames/components/ToolButton';
import { cn } from '/src/utils/classnames';
import { createTrim } from '/src/utils/trim';

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
        trim={ToolButtonTrim}
        disabled={props.disabled}
        iconName="pencil"
        label="Edit"
        onClick={() => props.edit.enable()}
      />
    );
  }, DefaultProps)
);

export const ToolButtonTrim = createTrim(DefaultToolButtonTrim, {
  base: {
    Icon: {
      size: ToolButtonS.Icon.size.small(),
      color: ToolButtonS.Icon.color.grayFill(),
    },
  },
});
