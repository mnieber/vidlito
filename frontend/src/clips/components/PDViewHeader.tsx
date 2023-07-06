import { observer } from 'mobx-react-lite';
import { Edit } from 'skandha-facets';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './PDViewHeader.scss';

export type PropsT = {
  pdEdit: Edit;
  className?: any;
};

const DefaultProps = {
  ...dps.clipPDEdit,
};

export const PDViewHeader = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'PDViewHeader',
          L.row.skewer(),
          'mb-3',
          'grow',
          'justify-between',
          props.className
        )}
      >
        <div>Private data</div>
        <button
          className={cn(
            'PDEditButton',
            //
            //
            L.ToolButton.root()
          )}
          onClick={() => {
            props.pdEdit.enable();
          }}
        >
          <Icon
            className={cn('PDEditButton__Icon', L.ToolButton.icon.small())}
            name="pencil"
          />
          Edit
        </button>
      </div>
    );
  }, DefaultProps)
);
