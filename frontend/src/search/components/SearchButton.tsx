import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ToolButton } from '/src/frames/components/ToolButton';
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
      <ToolButton
        className={cn('SearchButton', props.className)}
        iconName="search"
        label="Search"
        onClick={() => {
          props.dashboardState.navigationState.storeNavigationPoint();
          navToSearch();
        }}
      />
    );
  }, DefaultProps)
);
