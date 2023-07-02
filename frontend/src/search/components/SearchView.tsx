import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
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
};

export const SearchView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'SearchView',
          //
          //
          L.col.banner(),
          'grow',
          props.className
        )}
      >
        <SearchFormView className="mb-4" />
        <SearchResultListView />
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
