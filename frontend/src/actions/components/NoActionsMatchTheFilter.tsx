import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MessageCardL } from '/src/frames/components/MessageCard';
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
          [MessageCardL.root(), MessageCardL.wallpaper(), props.className]
        )}
      >
        {
          // 🔳 Message 🔳
        }
        <div
          className={cn(
            'NoActionsMatchTheFilter__Message',
            [],
            [MessageCardL.message()]
          )}
        >
          {props.msg}
        </div>
      </div>
    );
  }, DefaultProps)
);
