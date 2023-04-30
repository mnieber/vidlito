import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import { FramesUrlEvents, useUrlEventHandler } from 'src/frames/pages';
import { cln } from 'src/utils/classnames';

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
        className={cln('Logo', 'text-3xl font-bold')(
          //
          rowSkewer,
          'mt-4 mb-6',
          'self-center',
          props.className
        )}
        onClick={() => urlEvents.goToHome()}
      >
        <div className={cln('Logo__TitlePrefix__', `text-primaryBlue`)()}>
          vid
        </div>
        <div className={cln('Logo__TitleSuffix__', `text-primaryTeal`)()}>
          lito
        </div>
      </div>
    );
  }, DefaultProps)
);
