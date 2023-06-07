import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { FramesNavEvents, useNavHandler } from '/src/frames/pages';
import { cn } from '/src/utils/classnames';

// Import styles
import './Logo.scss';

const useNavEvents = () => useNavHandler<typeof FramesNavEvents>();

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const Logo = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const nav = useNavEvents();

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
        onClick={() => nav.goToHome()}
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
