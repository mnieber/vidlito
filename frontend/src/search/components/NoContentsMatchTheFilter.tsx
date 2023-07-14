import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './NoContentsMatchTheFilter.scss';

export type PropsT = {
  msg: string;
  className?: any;
};

const DefaultProps = {
  ...dps.searchResults,
};

export const NoContentsMatchTheFilter = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'NoContentsMatchTheFilter',
          'grow',
          L.row.skewer(),
          props.className
        )}
      >
        <div
          className={cn(
            'NoContentsMatchTheFilter__Message',
            'grow',
            'self-center'
          )}
        >
          {props.msg}
        </div>
      </div>
    );
  }, DefaultProps)
);
