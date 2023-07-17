import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { navToSearch } from '/src/search/SearchNavEvents';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.dashboardState,
};

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
        onClick={() => {
          props.dashboardState.storeNavigationPoint();
          navToSearch();
        }}
      >
        <Icon
          className={cn(l.icon.root(), l.icon.size.normal())}
          name="search"
        />
        Search
      </button>
    );
  }, DefaultProps)
);
