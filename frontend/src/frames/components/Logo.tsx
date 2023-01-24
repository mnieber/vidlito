import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './Logo.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const Logo = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('Logo', rowSkewer, props.className)}>
        <img className={cn('Logo__Image')} alt="" src="/logo.png" />
      </div>
    );
  }, DefaultProps)
);
