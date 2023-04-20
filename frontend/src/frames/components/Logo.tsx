import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import { FramesUrlEventsT, useUrlEventHandler } from 'src/frames/pages';
import { cn, d } from 'src/utils/classnames';
import './Logo.scss';

export type UrlEventsT = FramesUrlEventsT;

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const Logo = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEventHandler<UrlEventsT>();

    return (
      <div
        className={cn(
          //
          'Logo',
          rowSkewer,
          'mt-4 mb-6',
          'self-center',
          'text-3xl font-bold',
          props.className
        )}
        onClick={() => urlEvents.goToHome()}
      >
        <div className={cn(d('Logo__TitlePrefix'), `text-primaryBlue`)}>
          vid
        </div>
        <div className={cn(d('Logo__TitleSuffix'), `text-primaryTeal`)}>
          lito
        </div>
      </div>
    );
  }, DefaultProps)
);
