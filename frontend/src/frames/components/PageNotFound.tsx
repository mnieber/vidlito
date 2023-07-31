import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { MessageCard, MessageCardS } from '/src/frames/components/MessageCard';
import { navHandler } from '/src/navHandler/NavHandler';
import { cn } from '/src/utils/classnames';

// Import styles
import './PageNotFound.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const PageNotFound = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!!navHandler.getRouteMatch()) {
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
  }, DefaultProps)
);
