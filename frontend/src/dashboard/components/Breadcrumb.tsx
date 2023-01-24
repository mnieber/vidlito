import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './Breadcrumb.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
};

export const Breadcrumb = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('Breadcrumb', rowSkewer, props.className)}>
        Breadcrumb
      </div>
    );
  }, DefaultProps)
);
