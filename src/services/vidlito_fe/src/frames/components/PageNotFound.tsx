import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { MessageCard, MessageCardS } from '/src/frames/components/MessageCard';
import { getRouteMatch } from '/src/routes/utils/getRouteMatch';
import { cn } from '/src/utils/classnames';

// Import styles
import './PageNotFound.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {};

export const PageNotFound = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    if (!!getRouteMatch()) {
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
