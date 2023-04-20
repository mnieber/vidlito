import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { modestButton } from 'src/frames/components/ModestButton';
import { cn } from 'src/utils/classnames';
import './SearchButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const SearchButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <button
        className={cn('SearchButton', modestButton.container, props.className)}
        onClick={() => (console as any).log('Moonleap Todo')}
      >
        <Icon className={cn(modestButton.icon)} name="search" />
        Search
      </button>
    );
  }, DefaultProps)
);
