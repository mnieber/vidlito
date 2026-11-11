import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { actionsCtx } from '/src/actions/hooks/useActionsContext';
import { MessageCard, MessageCardS } from '/src/frames/components/MessageCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './NoActionsMatchTheFilter.scss';

export type PropsT = {
  msg: string;
  className?: any;
};

const ContextProps = {
  actions: actionsCtx.actions,
};

export const NoActionsMatchTheFilter = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
  }, ContextProps)
);
