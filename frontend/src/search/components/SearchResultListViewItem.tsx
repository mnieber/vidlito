import { observer } from 'mobx-react-lite';
import { highlightUIHandlers, HighlightUIPropsT } from 'skandha-facets';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListViewItem.scss';

export type PropsT = {
  searchResult: SearchResultT;
  highlightUIProps: HighlightUIPropsT;
  className?: any;
};

export const SearchResultListViewItem = observer((props: PropsT) => {
  return (
    <div
      className={cn(
        'SearchResultListViewItem',
        {
          'SearchResultListViewItem--highlighted':
            props.highlightUIProps.isHighlighted,
        },
        //
        //
        L.col.banner(),
        'py-3 px-4',
        props.className
      )}
      {...highlightUIHandlers(props.highlightUIProps)}
    >
      <div
        className={cn(
          'SearchResultListViewItem__Header',
          //
          //
          L.row.skewer()
        )}
      >
        <div
          className={cn(
            'SearchResultListViewItem__Title',
            //
            //
            'mr-2'
          )}
        >
          {props.searchResult.playlistSlug}
        </div>
      </div>
    </div>
  );
});
