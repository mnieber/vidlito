import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components';
import { ToolButtonL } from '/src/frames/components/ToolButton';
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
    return (
      <button
        className={cn(
          'SearchButton',
          [],
          [ToolButtonL.root(), props.className]
        )}
        onClick={() => {
          props.dashboardState.storeNavigationPoint();
          navToSearch();
        }}
      >
        <Icon
          className={cn(
            ToolButtonL.icon.root(),
            ToolButtonL.icon.size.normal()
          )}
          name="search"
        />
        Search
      </button>
    );
  }, DefaultProps)
);
