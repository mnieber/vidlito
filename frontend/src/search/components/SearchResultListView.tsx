import { observer } from 'mobx-react-lite';
import { createHighlightUIConnector } from 'skandha-facets';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { SearchResultListKeyHandler } from '/src/search/components';
import { NoContentsMatchTheFilter } from '/src/search/components/NoContentsMatchTheFilter';
import { SearchResultListViewItem } from '/src/search/components/SearchResultListViewItem';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.searchResults,
  ...dps.searchResultsHighlight,
  ...dps.searchState,
};

export const SearchResultListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const highlightUIConnector = createHighlightUIConnector(
      props.searchResultsHighlight
    );

    if (isLoading(props.searchResults)) {
      return <SearchResultListViewLoader />;
    } else if (!props.searchResults?.length)
      return (
        <NoContentsMatchTheFilter
          msg={'No contents match the search criteria'}
        />
      );

    const searchResultDivs: any[] = props.searchResults.map((searchResult) => {
      return (
        <SearchResultListViewItem
          key={`item-${searchResult.id}`}
          searchResult={searchResult}
          highlightUIProps={highlightUIConnector.handle(searchResult.id)}
        />
      );
    });

    return (
      <SearchResultListKeyHandler>
        <div
          className={cn(
            'SearchResultListView',
            //
            //
            L.col.banner(),
            props.className
          )}
          tabIndex={0}
        >
          {searchResultDivs.length > 0 && searchResultDivs}
        </div>
      </SearchResultListKeyHandler>
    );
  }, DefaultProps)
);

export const SearchResultListViewLoader = (props: { className?: any }) => {
  const l = L.Lvi;
  const divs = ['1', '2', '3'].map((id: string) => {
    return (
      <div
        key={id}
        className={cn(
          'SearchResultListViewLoader__Item',
          l.root(),
          'h-4 my-4',
          'rounded bg-gray-300'
        )}
      />
    );
  });

  return (
    <div
      className={cn(
        'SearchResultListViewLoader',
        //
        //
        L.col.banner(),
        props.className
      )}
    >
      {divs}
    </div>
  );
};
