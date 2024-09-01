import { observer } from 'mobx-react-lite';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { dashboardNav } from '/src/dashboard/routes';
import { navTo } from '/src/routes/navHandler';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListViewItem.scss';

export type PropsT = {
  searchResult: SearchResultT;
};

export const SearchResultListViewItem = observer((props: PropsT) => {
  return (
    <div
      className={cn('SearchResultListViewItem', 'group', 'contents')}
      onClick={() => {
        if (props.searchResult.clipSlug) {
          navTo(
            dashboardNav.clip({
              ownerUsername: props.searchResult.ownerUsername,
              playlistSlug: props.searchResult.playlistSlug,
              clipSlug: props.searchResult.clipSlug,
            })
          );
        } else {
          navTo(
            dashboardNav.playlist({
              ownerUsername: props.searchResult.ownerUsername,
              playlistSlug: props.searchResult.playlistSlug,
            })
          );
        }
      }}
    >
      <div className={cn('SearchResultListViewItem__Cell')}>
        {props.searchResult.ownerUsername}
      </div>
      <div
        className={cn(
          'SearchResultListViewItem__Cell',
          ['hover:underline', 'text-blue-primary'],
          []
        )}
        onClick={(e: any) => {
          e.stopPropagation();
          navTo(
            dashboardNav.playlist({
              ownerUsername: props.searchResult.ownerUsername,
              playlistSlug: props.searchResult.playlistSlug,
            })
          );
        }}
      >
        {props.searchResult.playlistName}
      </div>
      <div className={cn('SearchResultListViewItem__Cell')}>
        {props.searchResult.nrOfClips}
      </div>
      <div
        className={cn(
          'SearchResultListViewItem__Cell',
          ['hover:underline', 'text-teal-primary'],
          []
        )}
      >
        {props.searchResult.clipName}
      </div>
    </div>
  );
});
