import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { WallPaperCardL } from '/src/frames/components/WallPaperCard';
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
          WallPaperCardL.root(),
          //
          //
          props.className
        )}
      >
        <div className={cn('PageNotFound__Message', WallPaperCardL.message())}>
          Oops, it seems this page doesn't exist
        </div>
      </div>
    );
  }, DefaultProps)
);
