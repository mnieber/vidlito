import { observer } from 'mobx-react-lite';
import { useNavContext } from 'react-nav-handler';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { toClip } from '/src/clips/navFunctions';
import { toPlaylist } from '/src/playlists/navFunctions';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListViewItem.scss';

export type PropsT = {
  searchResult: SearchResultT;
};

export const SearchResultListViewItem = observer((props: PropsT) => {
  const navContext = useNavContext('SearchResultListViewItem');
  return (
    <div
      className={cn('SearchResultListViewItem', 'group', 'contents')}
      onClick={() => {
        if (props.searchResult.clipSlug) {
          navContext.nav(toClip)(
            props.searchResult.ownerUsername,
            props.searchResult.playlistSlug,
            props.searchResult.clipSlug
          );
        } else {
          navContext.nav(toPlaylist)(
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
          navContext.nav(toPlaylist)(
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
