import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { MessageCard, MessageCardS } from '/src/frames/components/MessageCard';
import { useHasRouteMatch } from '/src/routes/hooks';
import { cn } from '/src/utils/classnames';

// Import styles
import './PageNotFound.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {};

export const PageNotFound = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const hasRouteMatch = useHasRouteMatch();
    if (hasRouteMatch) {
      return null;
    }

    return (
      <MessageCard
        className={cn('PageNotFound', [props.className])}
        wallPaper={true}
      >
        <div className={cn(MessageCardS.Message(), 'PageNotFound__Message')}>
          Oops, it seems this page doesn't exist
        </div>
      </MessageCard>
    );
  }, ContextProps)
);
