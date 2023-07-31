import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { CloseButton } from '/src/frames/components/CloseButton';
import { PageNav } from '/src/frames/components/PageNav';
import { L } from '/src/frames/layout';
import { SearchFormView } from '/src/search/components/SearchFormView';
import { SearchResultListView } from '/src/search/components/SearchResultListView';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.searchResultsPagination,
  ...dps.dashboardState,
};

export const SearchView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn('SearchView', [L.col.banner(), 'grow', props.className])}
      >
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
  }, DefaultProps)
);
