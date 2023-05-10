import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { FramesUrlEvents, useUrlEventHandler } from '/src/frames/pages';
import { cn } from '/src/utils/classnames';

// Import styles
import './Logo.scss';

const useUrlEvents = () => useUrlEventHandler<typeof FramesUrlEvents>();

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const Logo = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEvents();

    return (
      <div
        className={cn(
          'Logo',
          'text-3xl font-bold',
          //
          //
          L.row.skewer(),
          'mt-4 mb-6',
          'self-center',
          props.className
        )}
        onClick={() => urlEvents.goToHome()}
      >
        <div
          className={cn(
            'Logo__TitlePrefix__',
            `text-primaryBlue`
            //
            //
          )}
        >
          vid
        </div>
        <div
          className={cn(
            'Logo__TitleSuffix__',
            `text-primaryTeal`
            //
            //
          )}
        >
          lito
        </div>
      </div>
    );
  }, DefaultProps)
);
