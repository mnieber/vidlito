import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { navGoToHome } from '/src/frames/FramesNavEvents';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './Logo.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const Logo = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
        onClick={() => navGoToHome()}
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
