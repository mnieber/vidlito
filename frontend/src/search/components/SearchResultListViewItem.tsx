import { observer } from 'mobx-react-lite';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListViewItem.scss';

export type PropsT = {
  searchResult: SearchResultT;
};

export const SearchResultListViewItem = observer((props: PropsT) => {
  return (
    <div
      className={cn('SearchResultListViewItem', 'cursor-pointer', 'contents')}
      onClick={() =>
        navToClip(
          props.searchResult.ownerUsername,
          props.searchResult.playlistSlug,
          props.searchResult.clipSlug
        )
      }
    >
      <div className={cn('SearchResultListViewItem__Cell')}>
        {props.searchResult.ownerUsername}
      </div>
      <div
        className={cn(
          'SearchResultListViewItem__Cell',
          'text-primaryBlue',
          'hover:underline'
        )}
      >
        {props.searchResult.playlistName}
      </div>
      <div className={cn('SearchResultListViewItem__Cell')}>
        {props.searchResult.nrOfClips}
      </div>
      <div
        className={cn(
          'SearchResultListViewItem__Cell',
          'text-primaryTeal',
          'hover:underline'
        )}
      >
        {props.searchResult.clipName}
      </div>
    </div>
  );
});
