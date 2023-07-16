import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
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
      <div
        className={cn(
          'PageNotFound',
          L.WallPaperCard.root(),
          //
          //
          props.className
        )}
      >
        <div className={cn('PageNotFound__Message')}>
          Oops, it seems this page doesn't exist
        </div>
      </div>
    );
  }, DefaultProps)
);
