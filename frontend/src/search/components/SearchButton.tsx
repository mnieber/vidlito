import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';

// Import styles
import './SearchButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const SearchButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const l = L.ToolButton;

    return (
      <button
        className={cn(
          'SearchButton',
          //
          //
          l.root(),
          props.className
        )}
        onClick={() => (console as any).log('Moonleap Todo')}
      >
        <Icon className={cn(l.icon.normal())} name="search" />
        Search
      </button>
    );
  }, DefaultProps)
);
