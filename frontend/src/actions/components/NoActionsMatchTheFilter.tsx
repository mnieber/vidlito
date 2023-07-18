import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { WallPaperCardL } from '/src/frames/components/WallPaperCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './NoActionsMatchTheFilter.scss';

export type PropsT = {
  msg: string;
  className?: any;
};

const DefaultProps = {
  ...dps.actions,
};

export const NoActionsMatchTheFilter = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      /*
      🔳 NoActionsMatchTheFilter 🔳
      */
      <div
        className={cn(
          'NoActionsMatchTheFilter',
          [],
          [WallPaperCardL.root(), props.className]
        )}
      >
        {
          // 🔳 Message 🔳
        }
        <div
          className={cn(
            'NoActionsMatchTheFilter__Message',
            [],
            [WallPaperCardL.message()]
          )}
        >
          {props.msg}
        </div>
      </div>
    );
  }, DefaultProps)
);
