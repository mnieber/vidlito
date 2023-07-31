import { observer } from 'mobx-react-lite';
import { isLoading, isUpdating } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { L } from '/src/frames/layout';
import { SearchResultListKeyHandler } from '/src/search/components';
import { NoContentsMatchTheFilter } from '/src/search/components/NoContentsMatchTheFilter';
import { SearchResultListViewHeader } from '/src/search/components/SearchResultListViewHeader';
import { SearchResultListViewItem } from '/src/search/components/SearchResultListViewItem';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.searchResultsPage,
  ...dps.searchResultsHighlight,
  ...dps.searchState,
  ...dps.searchForm,
};

export const SearchResultListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (
      isLoading(props.searchResultsPage) ||
      isUpdating(props.searchResultsPage)
    ) {
      return <SearchResultListViewLoader />;
    } else if (!props.searchResultsPage?.length)
      return !!props.searchForm ? (
        <NoContentsMatchTheFilter
          msg={'No contents match the search criteria'}
        />
      ) : null;

    const searchResultDivs: any[] = props.searchResultsPage.map(
      (searchResult) => {
        return (
          <SearchResultListViewItem
            key={`item-${searchResult.id}`}
            searchResult={searchResult}
          />
        );
      }
    );

    return (
      <SearchResultListKeyHandler>
        <div
          className={cn('SearchResultListView', ['grid', props.className])}
          tabIndex={0}
        >
          {searchResultDivs.length > 0 && <SearchResultListViewHeader />}
          {searchResultDivs.length > 0 && searchResultDivs}
        </div>
      </SearchResultListKeyHandler>
    );
  }, DefaultProps)
);

export const SearchResultListViewLoader = (props: { className?: any }) => {
  const divs = ['1', '2', '3'].map((id: string) => {
    return <LoaderBar key={id} className={cn('py-1 h-4 my-4')} />;
  });

  return (
    <div
      className={cn('SearchResultListViewLoader', [
        L.col.banner(),
        props.className,
      ])}
    >
      {divs}
    </div>
  );
};
