import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { authNav } from '/src/auth/routes';
import { L } from '/src/frames/layout';
import { navTo } from '/src/routes/navHandler';
import { cn } from '/src/utils/classnames';

// Import styles
import './Logo.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {};

export const Logo = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <div
        className={cn('Logo', [
          L.row.skewer(),
          'mb-6 mt-4',
          'self-center',
          props.className,
        ])}
        onClick={() => navTo(authNav.home({}))}
      >
        <div className={cn('Logo__TitlePrefix')}>vid</div>
        <div className={cn('Logo__TitleSuffix')}>lito</div>
      </div>
    );
  }, ContextProps)
);
