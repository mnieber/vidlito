import { observer } from 'mobx-react-lite';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListViewItem.scss';

export type PropsT = {
  searchResult: SearchResultT;
  className?: any;
};

export const SearchResultListViewItem = observer((props: PropsT) => {
  return (
    <div
      className={cn(
        'SearchResultListViewItem',
        'cursor-pointer',
        //
        //
        L.col.banner(),
        'py-3 px-4',
        props.className
      )}
      onClick={() =>
        navToClip(
          props.searchResult.ownerUsername,
          props.searchResult.playlistSlug,
          props.searchResult.clipSlug
        )
      }
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
