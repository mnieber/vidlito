import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { withContextProps } from 'react-props-from-context';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { L } from '/src/frames/layout';
import { SearchResultListKeyHandler } from '/src/search/components';
import { NoContentsMatchTheFilter } from '/src/search/components/NoContentsMatchTheFilter';
import { SearchResultListViewHeader } from '/src/search/components/SearchResultListViewHeader';
import { SearchResultListViewItem } from '/src/search/components/SearchResultListViewItem';
import { searchCtx } from '/src/search/hooks/useSearchContext';
import { DelayedFlag } from '/src/utils/DelayedFlag';
import { cn } from '/src/utils/classnames';
import { useBuilder } from '/src/utils/hooks/useBuilder';

// Import styles
import './SearchResultListView.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  searchResults: searchCtx.searchResults,
  searchResultsHighlight: searchCtx.searchResultsHighlight,
  searchState: searchCtx.searchState,
  search: searchCtx.search,
};

export const SearchResultListView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const noSearchResultsFlag = useBuilder(() => new DelayedFlag());
    noSearchResultsFlag.update(
      !!props.search.form && !props.searchResults?.length
    );

    if (isLoading(props.searchResults)) {
      return <SearchResultListViewLoader />;
    } else if (noSearchResultsFlag.flag) {
      return (
        <NoContentsMatchTheFilter
          msg={'No contents match the search criteria'}
        />
      );
    } else if (!props.searchResults?.length) {
      return null;
    }

    const searchResultDivs: any[] = props.searchResults.map((searchResult) => {
      return (
        <SearchResultListViewItem
          key={`item-${searchResult.id}`}
          searchResult={searchResult}
        />
      );
    });

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
  }, ContextProps)
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
