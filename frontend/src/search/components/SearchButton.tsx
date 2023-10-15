import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { ToolButton } from '/src/frames/components/ToolButton';
import { navToSearch } from '/src/search/navFunctions';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchButton.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  dashboardState: dashboardCtx.dashboardState,
};

export const SearchButton = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
  }, ContextProps)
);
