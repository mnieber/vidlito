import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { L } from '/src/frames/layout';
import { navToHome } from '/src/frames/navFunctions';
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
          'mt-4 mb-6',
          'self-center',
          props.className,
        ])}
        onClick={() => navToHome()}
      >
        <div className={cn('Logo__TitlePrefix')}>vid</div>
        <div className={cn('Logo__TitleSuffix')}>lito</div>
      </div>
    );
  }, ContextProps)
);
