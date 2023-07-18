import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn, foo } from '/src/utils/classnames';

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
        className={foo({
          component: ['NoActionsMatchTheFilter', L.WallPaperCard.root()],
          adhoc: [L.col.banner(), props.className],
        })}
      >
        {/*
        🔳 Message 🔳
        */}
        <div
          className={cn(
            'NoActionsMatchTheFilter__Message',
            L.WallPaperCard.message()
          )}
        >
          {props.msg}
        </div>
      </div>
    );
  }, DefaultProps)
);
