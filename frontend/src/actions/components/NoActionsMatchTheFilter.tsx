import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MessageCard, MessageCardS } from '/src/frames/components/MessageCard';
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
      <MessageCard
        wallPaper={true}
        className={cn('NoActionsMatchTheFilter', [props.className])}
      >
        {
          // 🔳 Message 🔳
        }
        <div
          className={cn(
            MessageCardS.Message(),
            'NoActionsMatchTheFilter__Message'
          )}
        >
          {props.msg}
        </div>
      </MessageCard>
    );
  }, DefaultProps)
);
