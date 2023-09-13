import { observer } from 'mobx-react-lite';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { navToClip } from '/src/clips/navEvents';
import { navToPlaylist } from '/src/playlists/navEvents';
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
          navToClip(
            props.searchResult.ownerUsername,
            props.searchResult.playlistSlug,
            props.searchResult.clipSlug
          );
        } else {
          navToPlaylist(
            props.searchResult.ownerUsername,
            props.searchResult.playlistSlug
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
          navToPlaylist(
            props.searchResult.ownerUsername,
            props.searchResult.playlistSlug
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
