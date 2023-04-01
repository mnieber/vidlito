import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
import { lvi } from 'src/frames/components/Lvi';
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
        onClick={() => (console as any).log('Moonleap Todo')}
      >
        <div className={cn(rowSkewer)}>
          <Icon className={cn(lvi.leadingIcon)} name="search" />
          Search
        </div>
      </button>
    );
  }, DefaultProps)
);
