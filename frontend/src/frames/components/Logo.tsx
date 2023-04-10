import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import { FramesUrlEventsT, useUrlEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
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
        className={cn('Logo', rowSkewer, props.className)}
        onClick={() => urlEvents.goToHome()}
      >
        <img className={cn('Logo__Image')} alt="" src="/logo.png" />
      </div>
    );
  }, DefaultProps)
);
