import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { ToolButton_ } from 'src/frames/components/ToolButton';
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
        className={cn('SearchButton', ToolButton_.root, props.className)}
        onClick={() => (console as any).log('Moonleap Todo')}
      >
        <Icon className={cn(ToolButton_.icon.normal)} name="search" />
        Search
      </button>
    );
  }, DefaultProps)
);
