import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
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
        className={cn('SearchButton', mainButton, props.className)}
        onClick={() => console.log('Moonleap Todo')}
      >
        <div className={cn(rowSkewer)}>
          <Icon name="search" className="mr-2" />
          Search
        </div>
      </button>
    );
  }, DefaultProps)
);
