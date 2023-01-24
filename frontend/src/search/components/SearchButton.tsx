import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { button, rowSkewer } from 'src/frames/components';
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
        className={cn('SearchButton', rowSkewer, button, props.className)}
        onClick={() => console.log('Moonleap Todo')}
      >
        Search
      </button>
    );
  }, DefaultProps)
);
