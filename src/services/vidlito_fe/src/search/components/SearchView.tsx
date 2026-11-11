import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { CloseButton } from '/src/frames/components/CloseButton';
import { PageNav } from '/src/frames/components/PageNav';
import { L } from '/src/frames/layout';
import { SearchFormView } from '/src/search/components/SearchFormView';
import { SearchResultListView } from '/src/search/components/SearchResultListView';
import { searchCtx } from '/src/search/hooks/useSearchContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchView.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  searchResultsPagination: searchCtx.searchResultsPagination,
  dashboardState: dashboardCtx.dashboardState,
};

export const SearchView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <div className={cn('SearchView', [L.col.banner(), props.className])}>
        <div
          className={cn('SearchView__TopRow', [L.row.revFlagPole(), 'mb-4'])}
        >
          <div className={cn('SearchView__Title')}>Search</div>
          <div className="flex-grow" />
          {
            // 🔳 Close Button 🔳
          }
          {props.dashboardState.navigationState.hasNavigationPoint && (
            <CloseButton
              className=""
              onClick={() => {
                props.dashboardState.navigationState.restoreNavigationPoint();
              }}
            />
          )}
        </div>
        {
          // 🔳 Search Form 🔳
        }
        <SearchFormView className="mb-4" />
        {
          // 🔳 Search Results 🔳
        }
        <SearchResultListView />
        {
          // 🔳 Page Nav 🔳
        }
        {props.searchResultsPagination.nrOfPages > 1 && (
          <PageNav
            pagination={props.searchResultsPagination}
            className="mt-8"
          />
        )}
      </div>
    );
  }, ContextProps)
);
