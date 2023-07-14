import { observer } from 'mobx-react-lite';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListViewItem.scss';

export type PropsT = {
  searchResult: SearchResultT;
};

export const SearchResultListViewItem = observer((props: PropsT) => {
  return (
    <div
      className={cn(
        'SearchResultListViewItem',
        'cursor-pointer',
        'group',
        'contents'
      )}
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
          'hover:underline',
          'text-primaryBlue'
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
          'hover:underline',
          'text-primaryTeal'
        )}
      >
        {props.searchResult.clipName}
      </div>
    </div>
  );
});
